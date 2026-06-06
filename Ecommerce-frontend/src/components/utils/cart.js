import { LiaBusAltSolid } from "react-icons/lia";
import { TbLabelFilled } from "react-icons/tb";

export function getCart() {
    const cartString = localStorage.getItem("cart");

    if (cartString == null) {
        localStorage.setItem("cart", JSON.stringify([]));
        return [];
    } else {
        return JSON.parse(cartString);
    }
}

export function addToCart(product, quantity) {
    const cart = getCart();
    
    // 🌟 වැදගත්: හැමතැනම productId එක String එකක් බවට පත් කරලා සසඳනවා (පැටලෙන්නේ නැති වෙන්න)
    const existingItemIndex = cart.findIndex(item => String(item.product.productId) === String(product.productId));
    
    // 🌟 ඔයා 'quantity' හෝ 'stock' මොන නම පාවිච්චි කරත් දෙකෙන්ම මුළු තොගය අල්ලගන්නවා
    const rawStock = product.stock !== undefined ? product.stock : (product.quantity !== undefined ? product.quantity : 999);
    const availableStock = parseInt(rawStock, 10) || 0;
    const inputQuantity = parseInt(quantity, 10) || 0;

    if (existingItemIndex === -1) {
        if (inputQuantity > 0) {
            if (inputQuantity > availableStock) {
                alert(`Sorry, only ${availableStock} items available in stock.`);
                return; 
            }

            // 🌟 කාර්ට් එකට වැටෙන පොදු ව්‍යුහය (Structure)
            cart.push({
                product: {
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    // පේජ් දෙකෙන්ම එන රූප එකම ක්‍රමයකට සේව් කරගන්නවා
                    image: product.image ? product.image : (product.Images && product.Images.length > 0 ? product.Images[0] : null),
                    stock: availableStock // කාර්ට් පේජ් එකේ ප්ලස් බටන් එකට ඕන නිසා සේව් කරනවා
                },
                quantity: inputQuantity
            });
        }
    } else {
        const currentCartQuantity = parseInt(cart[existingItemIndex].quantity, 10) || 0;
        const newQuantity = currentCartQuantity + inputQuantity;

        if (newQuantity > 0) {
            if (newQuantity > availableStock) {
                alert(`You already have ${currentCartQuantity} in cart. Cannot add more. Max available stock is ${availableStock}.`);
                return;
            }
            cart[existingItemIndex].quantity = newQuantity;
        } else {
            cart.splice(existingItemIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
}

export function removeFromCart(productId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => String(item.product.productId) !== String(productId));
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
}