import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import { getCart, addToCart, removeFromCart } from "../components/utils/cart";

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    const loadCart = () => {
        try {
            const cart = getCart();
            setCartItems(cart);
        } catch (error) {
            console.error("Error loading cart:", error);
            setCartItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Load cart from localStorage on mount
    useEffect(() => {
        loadCart();
    }, []);

    // Remove item from cart
    const handleRemoveItem = (productId) => {
        
        removeFromCart(productId);
        
        loadCart();
    };

    // Update quantity
    const handleQuantityChange = (productId, newQuantity) => {
        const currentItem = cartItems.find(item => String(item.product.productId) === String(productId));
        if (!currentItem) return;

        const difference = newQuantity - currentItem.quantity;

        
        addToCart(currentItem.product, difference);
        loadCart();
    };

    // Calculate subtotal
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const price = typeof item.product.price === 'string' 
                ? parseFloat(item.product.price) 
                : item.product.price;
            return total + (price * item.quantity);
        }, 0);
    };

    // Calculate total items
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotal = () => {
        return calculateSubtotal();
    };

    if (isLoading) {
        return (
            <div className="w-full bg-primary text-secondary p-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-lg">Loading cart...</p>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="w-full bg-primary text-secondary p-8 min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <Link 
                        to="/products" 
                        className="flex items-center gap-2 text-accent hover:text-orange-600 mb-8 font-medium"
                    >
                        <FiChevronLeft size={20} />
                        Back to Products
                    </Link>
                    <div className="text-center py-20">
                        <h1 className="text-4xl font-bold text-secondary mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-400 mb-8 text-lg">Start shopping to add items to your cart!</p>
                        <Link 
                            to="/products" 
                            className="inline-block bg-accent hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-primary text-secondary p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link 
                    to="/products" 
                    className="flex items-center gap-2 text-accent hover:text-orange-600 mb-8 font-medium"
                >
                    <FiChevronLeft size={20} />
                    Back to Products
                </Link>

                <h1 className="text-4xl font-bold text-secondary mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {/* Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600">
                                    <div className="col-span-5">Product</div>
                                    <div className="col-span-2 text-center">Quantity</div>
                                    <div className="col-span-2 text-right">Price</div>
                                    <div className="col-span-3 text-right">Total</div>
                                </div>
                            </div>

                            {/* Cart Items List */}
                            {cartItems.map((item) => (
                                <div key={item.product.productId} className="border-b border-gray-200 p-6 last:border-b-0">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* Product Info */}
                                        <div className="col-span-5 flex gap-4">
                                            {item.product.image && (
                                                <img 
                                                    src={item.product.image} 
                                                    srcSet=""
                                                    alt={item.product.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                            )}
                                            <div>
                                                <h3 className="font-semibold text-secondary mb-1">{item.product.name}</h3>
                                                <p className="text-sm text-gray-500">ID: {item.product.productId}</p>
                                            </div>
                                        </div>

                                        {/* Quantity Selector */}
                                        <div className="col-span-2">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.product.productId, item.quantity - 1)}
                                                    className="bg-gray-200 hover:bg-gray-300 text-secondary w-8 h-8 rounded flex items-center justify-center font-bold"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.product.productId, parseInt(e.target.value) || 1)}
                                                    min="1"
                                                    className="border border-gray-300 w-12 text-center px-2 py-1 rounded"
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(item.product.productId, item.quantity + 1)}
                                                    className="bg-gray-200 hover:bg-gray-300 text-secondary w-8 h-8 rounded flex items-center justify-center font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Unit Price */}
                                        <div className="col-span-2 text-right">
                                            <p className="font-semibold text-secondary">
                                                Rs. {typeof item.product.price === 'string' ? item.product.price : item.product.price?.toLocaleString()}
                                            </p>
                                            {item.product.labelledPrice && item.product.labelledPrice > item.product.price && (
                                                <p className="text-sm text-gray-400 line-through">
                                                    Rs. {typeof item.product.labelledPrice === 'string' ? item.product.labelledPrice : item.product.labelledPrice?.toLocaleString()}
                                                </p>
                                            )}
                                        </div>

                                        {/* Total & Remove */}
                                        <div className="col-span-3 flex items-center justify-between">
                                            <p className="font-bold text-accent text-lg">
                                                Rs. {(item.product.price * item.quantity).toLocaleString()}
                                            </p>
                                            <button
                                                onClick={() => handleRemoveItem(item.product.productId)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
                                                title="Remove item"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-secondary mb-6">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal:</span>
                                    <span>Rs. {calculateSubtotal().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping:</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax:</span>
                                    <span>Rs. 0</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-bold text-lg mb-6">
                                <span>Total:</span>
                                <span className="text-accent text-2xl">Rs. {calculateTotal().toLocaleString()}</span>
                            </div>

                            <button className="w-full bg-accent hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-300 mb-3">
                                Proceed to Checkout
                            </button>
                            <Link 
                                to="/products"
                                className="block text-center text-accent hover:text-orange-600 font-medium py-2 border border-accent rounded-lg transition"
                            >
                                Continue Shopping
                            </Link>

                            {/* Cart Stats */}
                            <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
                                <p className="mb-2">Items in cart: <span className="font-bold text-secondary">{cartItems.length}</span></p>
                                <p>Total quantity: <span className="font-bold text-secondary">{getTotalItems()}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}