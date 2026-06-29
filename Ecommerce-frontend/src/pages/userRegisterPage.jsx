import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function UserRegisterPage() {
    const navigate = useNavigate();
    
    // 🌟 Form එකට අදාළ States (Backend Schema එකට ගැලපෙන සේ)
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // 🌟 පරිශීලකයා ලියාපදිංචි කිරීමේ ශ්‍රිතය (Register Function)
    function handleRegister(e) {
        e.preventDefault();

        // 1. මූලික වැලිඩේෂන් (Validation Checks)
        if (!firstname.trim() || !lastname.trim() || !email.trim() || !password) {
            return toast.error("All fields are required!");
        }
        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters long!");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match!");
        }

        setIsLoading(true);

        // 2. Backend එකට දත්ත යැවීම
        axios.post(`${import.meta.env.VITE_API_URL}/users`, {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: password
            // සාමාන්‍ය රෙජිස්ට්‍රේෂන් එකකදී isAdmin එක backend එකෙන් auto false වේ
        })
        .then((response) => {
            console.log("Registration success:", response.data);
            
            // Backend එකෙන් Error string එකක් ආවොත් (res.json("Error Creating User"))
            if (response.data === "Error Creating User") {
                toast.error("Registration failed. Email might already exist.");
            } else {
                toast.success("Account created successfully!");
                navigate("/login"); // සාර්ථක වුණාම කෙලින්ම ලොගින් පේජ් එකට රීඩිරෙක්ට් කිරීම
            }
        })
        .catch((error) => {
            console.error("Registration error:", error);
            toast.error(error.response?.data?.message || "Registration failed!");
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        /* 🌟 h-[calc(100vh-88px)] මඟින් Header එක බලා කෝඩ් එක සක්‍රීන් එකට ලස්සනට ෆිට් කරයි (No Scroll) */
        <div className="w-full h-[calc(100vh-88px)] flex justify-center items-center bg-[url('/login-bg.png')] bg-cover bg-center overflow-hidden">
            
            {/* 🌟 Center Container: Glassmorphic Wrapper */}
            <div className="w-full max-w-xl p-4 flex justify-center items-center">
                
                {/* Premium Dark Glass Card */}
                <div className="w-full bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl flex flex-col justify-center items-center">
                    
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Create Account</h1>
                    <p className="text-sm text-slate-400 mb-6 text-center">Join us today! Please fill in your details to register.</p>
                    
                    <form onSubmit={handleRegister} className="w-full flex flex-col items-center">
                        
                        {/* First Name & Last Name (පේළියට තැබීම සඳහා Grid එකක් පාවිච්චි කළා) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-4">
                            <input 
                                onChange={(e) => setFirstname(e.target.value)} 
                                value={firstname} 
                                type="text" 
                                placeholder="First Name" 
                                className="w-full p-3.5 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-200 text-sm font-medium" 
                                required
                            />
                            <input 
                                onChange={(e) => setLastname(e.target.value)} 
                                value={lastname} 
                                type="text" 
                                placeholder="Last Name" 
                                className="w-full p-3.5 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-200 text-sm font-medium" 
                                required
                            />
                        </div>
                        
                        {/* Email Input */}
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full p-3.5 mb-4 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-200 text-sm font-medium" 
                            required
                        />
                        
                        {/* Password Input */}
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            type="password" 
                            placeholder="Password" 
                            className="w-full p-3.5 mb-4 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-200 text-sm font-medium" 
                            required
                        />

                        {/* Confirm Password Input */}
                        <input 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            value={confirmPassword} 
                            type="password" 
                            placeholder="Confirm Password" 
                            className="w-full p-3.5 mb-6 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-200 text-sm font-medium" 
                            required
                        />
                        
                        {/* Register Button */}
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full p-3.5 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:bg-orange-600 active:scale-98 transition-all duration-200 text-sm tracking-wide disabled:opacity-50"
                        >
                            {isLoading ? "Creating Account..." : "Register"}
                        </button>
                        
                    </form>
                    
                    {/* Sign in Footer Footer */}
                    <p className="mt-6 text-sm font-medium text-slate-300 text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-400 font-bold hover:underline transition-all">
                            Sign in
                        </Link>
                    </p>
                    
                </div>
            </div>

        </div>
    );
}