import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// 🌟 වෙනස් කළ ස්ථානය: 'props' එක සාමාන්‍ය පරිදි ගන්නවා, පරණ කෝඩ් එක බිඳෙන්නේ නැති වෙන්න
export default function CreateOrderModel(props) {
    const [ismodelOpen, setIsModelOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");      
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🌟 ආරක්ෂිතව cartItems ලබා ගැනීම: 
    // props.cartItems තිබ්බොත් ඒක ගන්නවා, නැත්නම් props.products ගන්නවා, ඒකත් නැත්නම් හිස් array [] එකක් ගන්නවා
    const itemsInCart = props.cartItems || props.products || props.state || [];

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!addressLine1.trim() || !city.trim() || !state.trim() || !postalCode.trim() || !phone.trim()) {
            toast.error("Please fill all required shipping fields.");
            return;
        }

        // 🌟 'cartItems.length' වෙනුවට ආරක්ෂිත 'itemsInCart.length' පාවිච්චි කරනවා
        if (itemsInCart.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to place an order.");
                setIsSubmitting(false);
                return;
            }

            // 🌟 ආරක්ෂිතව දත්ත map කිරීම
            const formattedProducts = itemsInCart.map(item => ({
                productId: item.product?.productId || item.productId,
                quantity: item.quantity
            }));

            const orderPayload = {
                firstName: firstName.trim() || undefined,
                lastName: lastName.trim() || undefined,
                phone: phone.trim(),
                addressLine1: addressLine1.trim(),
                addressLine2: addressLine2.trim(),
                city: city.trim(),
                state: state.trim(),
                postalCode: postalCode.trim(),
                products: formattedProducts
            };

            await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`, 
                orderPayload,
                {
                    headers: { "Authorization": `Bearer ${token}` }
                }
            );

            toast.success("Order placed successfully!");
            
            localStorage.removeItem("cart");
            if (props.loadCart) props.loadCart(); 
            
            setIsModelOpen(false);
        } catch (error) {
            console.error("Order error:", error);
            toast.error(error?.response?.data?.message || "Failed to place order.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModelOpen(true)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-300 mb-3"
            >
                Proceed to Payment
            </button>

            {ismodelOpen && (
                
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto pt-28 transition-all duration-300">
                    <div className="bg-white rounded-lg p-6  w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl transform scale-100 transition-transform duration-300">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-2">Shipping Details</h2>

                        <form onSubmit={handlePlaceOrder} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">First Name</label>
                                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Sandun" className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Name</label>
                                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Lankathilina" className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="Enter phone number (e.g., 0771234567)"
                                    className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Address Line 1 <span className="text-red-500">*</span></label>
                                <input type="text" required value={addressLine1} onChange={e => setAddressLine1(e.target.value)} placeholder="Street address" className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Address Line 2</label>
                                <input type="text" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} placeholder="Apartment, suite, etc. (optional)" className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">City <span className="text-red-500">*</span></label>
                                    <input type="text" required value={city} onChange={e => setCity(e.target.value)} placeholder="Colombo" className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">State / Province <span className="text-red-500">*</span></label>
                                    <input type="text" required value={state} onChange={e => setState(e.target.value)} placeholder="Western" className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Postal Code <span className="text-red-500">*</span></label>
                                <input type="text" required value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="10110" className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-green-500 transition-all" />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => setIsModelOpen(false)}
                                    className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold py-3 rounded-lg uppercase tracking-wider transition text-sm disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg uppercase tracking-wider transition text-sm flex items-center justify-center disabled:opacity-50"
                                >
                                    {isSubmitting ? "Placing Order..." : "Confirm Order"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}