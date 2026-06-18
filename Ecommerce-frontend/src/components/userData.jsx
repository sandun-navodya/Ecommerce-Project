import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiSettings, FiShoppingBag, FiLogOut } from "react-icons/fi"; 

export default function UserData() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  // 🌟 Real-time update වීමට Profile Fetch කරන කොටස වෙනම ශ්‍රිතයක් (Function) ලෙස ලියා ගැනීම
  const fetchUserProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then((response) => {
        // 💡 ඩේටාබේස් එකෙන් කෙලින්ම ආවත්, .user එකෙන් ආවත් ආරක්ෂිතව දත්ත කියවීම
        const user = response.data?.user || response.data?.users || response.data;
        setUserData(user);
        console.log("User data fetched successfully:", user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setUserData(null);
        }
      });
    } else {
      setUserData(null); // ටෝකන් එක නැතිනම් ස්ටේට් එක හිස් කිරීම
    }
  };

  useEffect(() => {
    // පළමු වරට පේජ් එක ලෝඩ් වෙද්දී දත්ත කියවීම
    fetchUserProfile();

    // 🌟 🌟 වැදගත්ම කොටස: Settings අප්ඩේට් වූ පසු පිටුව Refresh නොකර Header එක අප්ඩේට් වීමට 
    // අපි කලින් Settings පේජ් එකෙන් එවපු 'cart-updated' ඉවෙන්ට් එකට මෙතනින් සවන් දීම (Listen කිරීම)
    window.addEventListener("cart-updated", fetchUserProfile);

    // Dropdown එක ඇරලා තියෙද්දී එළියෙන් ක්ලික් කළොත් වහන ලොජික් එක
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup listeners
    return () => {
      window.removeEventListener("cart-updated", fetchUserProfile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout වීමේ ශ්‍රිතය
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin"); // 🌟 ආරක්ෂාවට isAdmin එකත් අයින් කරමු
    setUserData(null);
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
    navigate("/login"); 
  };

  return (
    <div className="hidden md:block relative" ref={dropdownRef}>
      {userData ? (
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-gray-800 rounded transition select-none"
        >
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm font-bold text-orange-400 max-w-[100px] truncate">
            {userData.firstname}
          </span>
        </div>
      ) : (
        <Link to="/login" className="p-1.5 hover:bg-gray-800 rounded transition inline-block">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      )}

      {isDropdownOpen && userData && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-2xl py-2 z-50 text-slate-800 border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
          
          <div className="px-4 py-2 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
            <p className="text-sm font-bold text-slate-700 truncate">{userData.firstname} {userData.lastname}</p>
          </div>

          {/* 1. My Orders Option */}
          <Link 
            to="/my-orders" 
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-orange-500 font-semibold transition"
          >
            <FiShoppingBag size={16} />
            <span>My Orders</span>
          </Link>

          {/* 2. Settings Option */}
          <Link 
            to="/settings" 
            onClick={() => setIsDropdownOpen(false)}
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