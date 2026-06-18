import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LoginPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
    console.log(email, password);

    axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        email: email,
        password: password
    }).then((response) => {
        console.log(response.data);

        // 🌟 1. Token එක සේව් කිරීම
        localStorage.setItem("token", response.data.token);
        
        // 🌟 2. නිවැරදි කිරීම: ඇඩ්මින්ද නැද්ද යන flag එකත් LocalStorage එකට සේව් කිරීම (මෙහිදී String එකක් ලෙස සේව් වේ)
        localStorage.setItem("isAdmin", response.data.isAdmin); 

        toast.success("Login successful!");
        
        // 💡 රීඩිරෙක්ට් ලොජික් එක
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
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-cover bg-center">
            {/* Left Column: Hidden on mobile, takes 50% width on desktop */}
            <div className="w-0 lg:w-1/2 h-full">
            </div>
            
            {/* Right Column (Form container): Takes full width on mobile, 50% width on desktop */}
            <div className="w-full lg:w-1/2 h-full border-10 flex justify-center items-center p-4">
                <div className="w-100 h-125 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col justify-center items-center ">
                    <h1 className="text-3xl font-bold text-primary mb-6">Sign in</h1>
                    <input onChange={
                        (e) => {
                            setEmail(e.target.value);
                        }
                    } value={email} type="email" placeholder="Email" className="w-3/4 p-3 mb-4 rounded-lg border-2 border-secondary bg-white/80 focus:outline-none focus:border-primary focus:bg-white transition-colors duration-200" />
                    <input onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    } value={password} type="password" placeholder="Password" className="w-3/4 p-3 mb-6 rounded-lg border-2 border-secondary bg-white/80 focus:outline-none focus:border-primary focus:bg-white transition-colors duration-200" />
                    <button onClick={handleLogin} className="w-3/4 p-3 bg-secondary text-primary font-medium rounded-lg hover:bg-primary hover:text-secondary transition-colors duration-200">Login</button>
                    <Link to="/forgot-password" className="mt-4 text-sm text-primary hover:underline hover:border-primary px-2 py-1 rounded transition-all duration-200">Forgot password?</Link>
                    <p className="mt-4 text-sm text-primary">Don’t have an account? <Link to="/register" className="text-secondary underline hover:text-primary">Register</Link></p>
                </div>
            </div>
        </div>
    );
}