import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiUser, FiLock, FiSave, FiUpload } from "react-icons/fi";

export default function SettingsPage() {
    // 🌟 Profile States
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [image, setImage] = useState("/images/default.png");
    const [email, setEmail] = useState(""); // Email එක පෙන්වීමට පමණි (Edit කළ නොහැක)
    const [isProfileLoading, setIsProfileLoading] = useState(false);

    // 🌟 Password States
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);

    // 1. පේජ් එක ලෝඩ් වෙද්දී දැනට ලොග් වී සිටින යූසර්ගේ දත්ත Input Boxes වලට ලෝඩ් කර ගැනීම
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then((response) => {
                const user = response.data?.user || response.data?.users || response.data;
                //const user=response.data.user;
                if (user) {
                    setFirstname(user.firstname || "");
                    setLastname(user.lastname || "");
                    setImage(user.image || "/images/default.png");
                    setEmail(user.email || "");
                }
            })
            .catch((error) => {
                console.error("Error fetching user settings data:", error);
                toast.error("Failed to load user profile data.");
            });
        }
    }, []);

    // 2. 🌟 Profile Update කරන ශ්‍රිතය (firstname, lastname, image)
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!firstname.trim() || !lastname.trim()) {
            return toast.error("Firstname and Lastname cannot be empty!");
        }

        setIsProfileLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/users`, 
                { firstname, lastname, image },
                { headers: { "Authorization": `Bearer ${token}` } }
            );

            toast.success("Profile updated successfully!");

            
            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
               
                window.dispatchEvent(new Event("cart-updated")); 
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setIsProfileLoading(false);
        }
    };

   
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!password) return toast.error("Please enter a new password!");
        if (password.length < 6) return toast.error("Password must be at least 6 characters long!");
        if (password !== confirmPassword) return toast.error("Passwords do not match!");

        setIsPasswordLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/users/password`, // 👈 ඔයාගේ userRouter.put('/password') එන්ඩ්පොයින්ට් එක
                { password },
                { headers: { "Authorization": `Bearer ${token}` } }
            );

            toast.success("Password updated successfully!");
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Password update error:", error);
            toast.error(error.response?.data?.message || "Failed to update password.");
        } finally {
            setIsPasswordLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Main Page Title */}
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Update your profile details and security preferences below.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Panel: Profile Image Card View */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col items-center justify-center text-center h-fit">
                        <div className="relative group">
                            <img 
                                src={image} 
                                alt="Profile" 
                                className="w-32 h-32 object-cover rounded-full border-4 border-slate-100 shadow-inner" 
                            />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mt-4">{firstname} {lastname}</h3>
                        <p className="text-xs font-semibold text-slate-400 font-mono mt-1">{email}</p>
                        
                        {/* Image URL Input (මැනුවලි ඉමේජ් පාත් එක දීමට) */}
                        <div className="w-full mt-4 flex flex-col gap-1.5 text-left">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Image URL</label>
                            <input 
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50 font-mono focus:outline-none focus:border-orange-500"
                                placeholder="/images/default.png"
                            />
                        </div>
                    </div>

                    {/* Right Panel: Forms Column (Profile & Password) */}
                    <div className="md:col-span-2 space-y-8">
                        
                        {/* Form 1: Personal Details */}
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                            <div className="flex items-center gap-2 border-b pb-3 mb-4">
                                <FiUser className="text-orange-500" size={20} />
                                <h2 className="text-lg font-bold text-slate-800">Personal Information</h2>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">First Name</label>
                                        <input 
                                            type="text" 
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-orange-500 transition font-medium"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Name</label>
                                        <input 
                                            type="text" 
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-orange-500 transition font-medium"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={isProfileLoading}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition active:scale-95 disabled:opacity-50"
                                    >
                                        <FiSave size={16} />
                                        {isProfileLoading ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Form 2: Change Password Security */}
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-100">
                            <div className="flex items-center gap-2 border-b pb-3 mb-4">
                                <FiLock className="text-orange-500" size={20} />
                                <h2 className="text-lg font-bold text-slate-800">Security & Password</h2>
                            </div>

                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Password</label>
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-orange-500 transition font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirm New Password</label>
                                        <input 
                                            type="password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm focus:outline-none focus:border-orange-500 transition font-medium"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={isPasswordLoading}
                                        className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition active:scale-95 disabled:opacity-50"
                                    >
                                        <FiLock size={16} />
                                        {isPasswordLoading ? "Updating..." : "Update Password"}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}