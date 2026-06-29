import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiHome, FiBox, FiInfo } from "react-icons/fi";
import { getCart } from "./utils/cart";
import UserData from "./userData"; // Ensure paths are matched correctly

export default function BottomNavbar() {
    const location = useLocation();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const updateCartCount = () => {
            const cart = getCart();
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(totalItems);
        };

        updateCartCount();
        window.addEventListener('cart-updated', updateCartCount);
        window.addEventListener('storage', updateCartCount);

        return () => {
            window.removeEventListener('cart-updated', updateCartCount);
            window.removeEventListener('storage', updateCartCount);
        };
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/70 backdrop-blur-lg border-t border-white/10 shadow-2xl px-4 py-2">
            <div className="flex items-center justify-around">

                {/* Home Button */}
                <Link
                    to="/"
                    className={`flex flex-col items-center gap-1 p-2 transition-all ${location.pathname === "/" ? "text-orange-500 scale-105" : "text-gray-400 hover:text-white"
                        }`}
                >
                    <FiHome size={22} />
                    <span className="text-xs font-medium">Home</span>
                </Link>

                {/* Products Button */}
                <Link
                    to="/products"
                    className={`flex flex-col items-center gap-1 p-2 transition-all ${location.pathname === "/products" ? "text-orange-500 scale-105" : "text-gray-400 hover:text-white"
                        }`}
                >
                    <FiBox size={22} />
                    <span className="text-xs font-medium">Products</span>
                </Link>

                {/* About Us Button */}
                <Link
                    to="/about"
                    className={`flex flex-col items-center gap-1 p-2 transition-all ${location.pathname === "/about" ? "text-orange-500 scale-105" : "text-gray-400 hover:text-white"
                        }`}
                >
                    <FiInfo size={22} />
                    <span className="text-xs font-medium">About Us</span>
                </Link>

                {/* Responsive Mobile User Target Integration */}
                <UserData isMobile={true} />

            </div>
        </div>
    );
}