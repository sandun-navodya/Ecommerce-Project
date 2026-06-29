import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSettings, FiShoppingBag, FiLogOut, FiX } from "react-icons/fi"; 

export default function UserData({ isMobile = false }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); 

  const fetchUserProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {
        const user = response.data?.user || response.data?.users || response.data;
        setUserData(user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setUserData(null);
        }
      });
    } else {
      setUserData(null); 
    }
  };

  useEffect(() => {
    fetchUserProfile();
    window.addEventListener("cart-updated", fetchUserProfile);
    window.addEventListener("storage", fetchUserProfile);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("cart-updated", fetchUserProfile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin"); 
    setUserData(null);
    setIsOpen(false);
    toast.success("Logged out successfully");
    navigate("/login"); 
  };

  // Helper template for User Profile Avatar / Fallback Vector
  const renderAvatar = (dimensionsClass = "w-7 h-7 sm:w-8 sm:h-8") => {
    if (userData?.image) {
      return (
        <img 
          src={userData.image} 
          alt={userData.firstname} 
          className={`${dimensionsClass} rounded-full object-cover border border-orange-400`} 
        />
      );
    }
    return (
      <div className={`${dimensionsClass} rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold border border-gray-600`}>
        {userData ? userData.firstname.charAt(0).toUpperCase() : (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
    );
  };

  // --- MOBILE RENDERING VARIANT ---
  if (isMobile) {
    return (
      <>
        {userData ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-white transition-all"
          >
            {renderAvatar("w-6 h-6")}
            <span className="text-xs font-medium max-w-[65px] truncate">{userData.firstname}</span>
          </button>
        ) : (
          <Link to="/login" className="flex flex-col items-center gap-1 p-2 text-gray-400 hover:text-white transition-all">
            {renderAvatar("w-6 h-6")}
            <span className="text-xs font-medium">Account</span>
          </Link>
        )}

        {/* Mobile Slide-up Drawer Menu Backdrop Layout */}
        {isOpen && userData && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full bg-white rounded-t-2xl p-5 text-slate-800 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
                  <p className="text-base font-bold text-slate-700 truncate">{userData.firstname} {userData.lastname}</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 bg-slate-100 rounded-full text-slate-500">
                  <FiX size={20} />
                </button>
              </div>

              <div className="py-2">
                <Link 
                  to="/my-orders" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 py-3.5 text-sm text-slate-600 font-semibold border-b border-slate-50"
                >
                  <FiShoppingBag size={18} className="text-orange-500" />
                  <span>My Orders</span>
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 py-3.5 text-sm text-slate-600 font-semibold border-b border-slate-50"
                >
                  <FiSettings size={18} className="text-orange-500" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 py-3.5 text-sm text-red-500 font-bold text-left"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // --- DESKTOP RENDERING VARIANT ---
  return (
    <div className="hidden md:block relative" ref={dropdownRef}>
      {userData ? (
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-gray-800 rounded transition select-none"
        >
          {renderAvatar()}
          <span className="text-sm font-bold text-orange-400 max-w-[100px] truncate">
            {userData.firstname}
          </span>
        </div>
      ) : (
        <Link to="/login" className="p-1.5 hover:bg-gray-800 rounded transition inline-block">
          {renderAvatar()}
        </Link>
      )}

      {isOpen && userData && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-2xl py-2 z-50 text-slate-800 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
            <p className="text-sm font-bold text-slate-700 truncate">{userData.firstname} {userData.lastname}</p>
          </div>

          <Link 
            to="/my-orders" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-500 font-semibold transition"
          >
            <FiShoppingBag size={16} />
            <span>My Orders</span>
          </Link>

          <Link 
            to="/settings" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-500 font-semibold transition"
          >
            <FiSettings size={16} />
            <span>Settings</span>
          </Link>

          <div className="border-t border-slate-100 my-1"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 font-bold transition text-left"
          >
            <FiLogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}