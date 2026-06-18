import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCart } from "./utils/cart";
import UserData from "../components/userData"; // 🌟 ඔයාගේ හදපු අලුත් Component එක මෙතනට Import කරගන්න

export default function Header() {
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
    <header className="w-full bg-black text-white sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between gap-8">
        
        {/* Logo Section - Left */}
        <Link to="/" className="shrink-0 hover:opacity-80 transition">
          <img src="/logo.png" alt="Logo" className="h-11 sm:h-14 w-auto" />
        </Link>

        {/* Navigation Links - Center (Mobile වලදී සැඟවේ) */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-8">
          <Link to="/" className="text-white hover:text-gray-300 transition font-medium text-lg">Home</Link>
          <Link to="/products" className="text-white hover:text-gray-300 transition font-medium text-lg">Products</Link>
          <Link to="/contact" className="text-white hover:text-gray-300 transition font-medium text-lg">Contact Us</Link>
        </div>

        {/* Right Icons Section */}
        <div className="flex items-center gap-4 shrink-0">
          
          {/* Search Icon */}
          <button className="p-1.5 hover:bg-gray-800 rounded transition">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative p-1.5 hover:bg-gray-800 rounded transition inline-block">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* 🌟 මෙන්න මෙතනට ඔයාගේ අලුත් Component එක ප්ලග් කළා */}
          <UserData />

        </div>
      </div>
    </header>
  );
}