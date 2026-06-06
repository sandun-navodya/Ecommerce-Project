import { LiaBusAltSolid } from "react-icons/lia";
import { TbLabelFilled } from "react-icons/tb";

export function getCart() {
    const cartString = localStorage.getItem("cart");

    if (cartString == null) {
        localStorage.setItem("cart", JSON.stringify([]));
        return [];
    }

    else {
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product, quantity) {
    const cart = getCart();

    const existingItemIndex = cart.findIndex(item => item.product.productId === product.productId);
    if (existingItemIndex == -1) {
        if (quantity > 0) {
            cart.push({
                product: {
                    productId: product.productId,
                    name: product.name,
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                    image: product.Images && product.Images.length > 0 ? product.Images[0] : null
              }
               , quantity
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    else{
        const newQuantity=cart[existingItemIndex].quantity + quantity;
        if(newQuantity>0){
            cart[existingItemIndex].quantity = newQuantity;
        }
        else{
            cart.splice(existingItemIndex,1);
        }
    }

    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}
