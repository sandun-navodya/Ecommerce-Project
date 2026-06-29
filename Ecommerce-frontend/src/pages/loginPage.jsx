import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'; // 🌟 Google Icon import කළා

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const googlelogin = useGoogleLogin({

        onSuccess: (responseToken) => {
            axios.post(`${import.meta.env.VITE_API_URL}/users/google-login`, {
                token: responseToken.access_token
            })
            .then((response) => {
                console.log("Google Login successful:", response.data);
            })
            .catch((error) => {
                console.error("Google Login error:", error);
                toast.error("Google Login Failed");
            });
    
        onError: (error) => {
            console.log("Login failed:", error);
            toast.error("Google Login Failed");
        }
    },
    
    });


    function handleLogin() {
        console.log(email, password);

        axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
            email: email,
            password: password
        }).then((response) => {
            console.log(response.data);


            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isAdmin", response.data.isAdmin);

            window.dispatchEvent(new Event("cart-updated"));

            toast.success("Login successful!");


            if (response.data.isAdmin) {
                navigate("/admin");
            } else {
                navigate("/");
            }

        }).catch((error) => {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed!");
        });
    }

    return (

        <div className="w-full h-[calc(100vh-88px)] flex justify-center items-center bg-[url('/login-bg.png')] bg-cover bg-center overflow-hidden">

            {/* 🌟 Left Column: Premium Text Section (Hidden on Mobile, 50% on Desktop) */}
            <div className="hidden lg:flex w-1/2 h-full flex-col justify-center items-start p-16 bg-black/30 backdrop-blur-xs">
                <div className="max-w-xl bg-black/40 p-8 rounded-2xl border border-white/10 shadow-2xl">
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                        Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Smart Tech</span>
                    </h2>
                    <p className="text-lg text-slate-200 leading-relaxed font-medium">
                        Upgrade your everyday life with the smartest tech! 🚀 Discover next-level gadgets designed to make your world faster, smarter, and easier. Shop now! 🛍️✨
                    </p>
                    <div className="mt-8 flex gap-3">
                        <span className="h-2 w-12 bg-orange-500 rounded-full"></span>
                        <span className="h-2 w-2 bg-white/50 rounded-full"></span>
                        <span className="h-2 w-2 bg-white/50 rounded-full"></span>
                    </div>
                </div>
            </div>

            {/* 🌟 Right Column: Glassmorphic Sign-in Form */}
            <div className="w-full lg:w-1/2 h-full flex justify-center items-center p-4 bg-black/10">
                {/* Modern Fixed Box Size with Transparent Glass Theme */}
                <div className="w-full max-w-md bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl flex flex-col justify-center items-center">

                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Sign in</h1>
                    <p className="text-sm text-slate-400 mb-8">Welcome back! Please enter your details.</p>

                    {/* Email Input */}
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                        className="w-full p-3.5 mb-4 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-200 text-sm font-medium"
                    />

                    {/* Password Input */}
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        placeholder="Password"
                        className="w-full p-3.5 mb-3 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-200 text-sm font-medium"
                    />

                    {/* Forgot Password Link */}
                    <div className="w-full flex justify-end mb-6">
                        <Link to="/forgot-password" className="text-xs font-semibold text-orange-400 hover:text-orange-500 transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    {/* 1. සාමාන්‍ය Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full p-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 active:scale-98 transition-all duration-200 text-sm tracking-wide mb-3"
                    >
                        Login
                    </button>

                    <button
                        onClick={googlelogin} // 👈 පරණ ෆන්ක්ෂන් එකම කෙලින්ම කෝල් වෙනවා
                        type="button"
                        className="w-full p-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-sm active:scale-98 transition-all duration-200 text-sm tracking-wide flex items-center justify-center gap-3 select-none"
                    >
                        <FcGoogle size={22} />
                        <span>Sign in with Google</span>
                    </button>

                    {/* Register Footer */}
                    <p className="mt-8 text-sm font-medium text-slate-300 text-center">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-orange-400 font-bold hover:underline transition-all">
                            Register
                        </Link>
                    </p>
                    <button >

                    </button>

                </div>
            </div>

        </div>
    );
}