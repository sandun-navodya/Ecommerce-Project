// import { FiX } from "react-icons/fi";
// import react, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function OrderDetailsModal({ order, isOpen, onClose }) {
//     const [status, setStatus] = useState("pending");
//     const [notes, setNotes] = useState(""); 
//     const [isUpdating, setIsUpdating] = useState(false);

    
//     useEffect(() => {
//         if (order) {
//             setStatus(order.status || "pending");
//             setNotes(order.notes || ""); 
//         }
//     }, [order]);

//     if (!isOpen || !order) return null;

  
//     const handleUpdateOrder = async () => {
//         setIsUpdating(true);
//         try {
//             const token = localStorage.getItem("token");
            
           
//             await axios.put(
//                 `${import.meta.env.VITE_API_URL}/orders/${order.orderId}`,
//                 { status, notes }, 
//                 { headers: { "Authorization": `Bearer ${token}` } }
//             );

//             toast.success("Order status updated successfully!");
            
           
//             order.status = status;
//             order.notes = notes;
            
//             onClose(); 
//         } catch (error) {
//             console.error("Error updating order status:", error);
//             toast.error(error?.response?.data?.message || "Failed to update order status.");
//         } finally {
//             setIsUpdating(false);
//         }
//     };

//     return (
//         /* Glassmorphic Blur Background */
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto pt-24 transition-all duration-300">
            
//             {/* Modal Card */}
//             <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative mt-4 border border-slate-100">
                
//                 {/* Close Button */}
//                 <button 
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-slate-400 hover:text-orange-500 hover:bg-slate-100 p-2 rounded-full transition-all duration-200"
//                     title="Close Window"
//                 >
//                     <FiX size={22} />
//                 </button>

//                 {/* Header */}
//                 <div className="border-b pb-3 mb-6">
//                     <h2 className="text-2xl font-bold text-slate-800">Order Details</h2>
//                     <p className="text-sm text-slate-500 mt-1">
//                         ID: <span className="font-mono font-bold text-slate-700">{order.orderId}</span> | Date: {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
//                     </p>
//                 </div>

//                 {/* Customer Info & Shipping Address */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
//                     <div>
//                         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Info</h3>
//                         <p className="text-sm font-bold text-slate-800">{order.firstName} {order.lastName}</p>
//                         <p className="text-sm text-slate-600 mt-1">{order.email}</p>
//                         <p className="text-sm text-slate-600">{order.phone}</p>
//                     </div>
//                     <div>
//                         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Address</h3>
//                         <p className="text-sm text-slate-700 font-medium">{order.addressLine1}</p>
//                         {order.addressLine2 && <p className="text-sm text-slate-600">{order.addressLine2}</p>}
//                         <p className="text-sm text-slate-700 mt-1">
//                             {order.city}, {order.state}, {order.postalCode}
//                         </p>
//                     </div>
//                 </div>

//                 {/* Products List Ordered */}
//                 <div className="mb-6">
//                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Items Ordered</h3>
//                     <div className="space-y-3">
//                         {order.products?.map((item, idx) => (
//                             <div key={idx} className="flex items-center justify-between border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
//                                 <div className="flex items-center gap-4">
//                                     {item.image ? (
//                                         <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-slate-200 bg-white" />
//                                     ) : (
//                                         <div className="w-14 h-14 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-xs text-slate-400">No Img</div>
//                                     )}
//                                     <div>
//                                         <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
//                                         <p className="text-xs text-slate-400 mt-0.5">ID: {item.productId}</p>
//                                     </div>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="text-sm font-bold text-slate-700">Rs {item.price?.toLocaleString()} x {item.quantity}</p>
//                                     <p className="text-xs font-semibold text-orange-500 mt-0.5">Total: Rs {(item.price * item.quantity)?.toLocaleString()}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

               
//                 <div className="mb-6 border-t pt-4 space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
//                         {/* Status Selection Dropdown */}
//                         <div className="flex flex-col gap-1.5">
//                             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Change Order Status</label>
//                             <select
//                                 value={status}
//                                 onChange={(e) => setStatus(e.target.value)}
//                                 className="bg-white border-2 border-slate-200 text-slate-700 px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500 text-sm font-bold shadow-sm cursor-pointer"
//                             >
//                                 <option value="pending">Pending</option>
//                                 <option value="processing">Processing</option>
//                                 <option value="shipped">Shipped</option>
//                                 <option value="delivered">Delivered</option>
//                             </select>
//                         </div>

//                         {/* Update Button */}
//                         <div className="flex flex-col justify-end h-full pt-5">
//                             <button
//                                 onClick={handleUpdateOrder}
//                                 disabled={isUpdating}
//                                 className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-md active:scale-95 disabled:opacity-50"
//                             >
//                                 {isUpdating ? "Updating..." : "Update Order"}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Special Notes Textarea */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Special Notes / Admin Comments</label>
//                         <textarea
//                             value={notes}
//                             onChange={(e) => setNotes(e.target.value)}
//                             placeholder="Add delivery tracking numbers, customer requests or inner notes here..."
//                             rows={3}
//                             className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-orange-500 transition-all resize-none font-medium text-slate-700"
//                         />
//                     </div>
//                 </div>

//                 {/* Footer Summary */}
//                 <div className="border-t pt-4 flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl shadow-md">
//                     <div>
//                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
//                         <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 ${
//                             order.status === 'completed' || order.status === 'delivered' ? 'bg-green-500 text-white' :
//                             order.status === 'pending' ? 'bg-amber-500 text-white' :
//                             'bg-blue-500 text-white'
//                         }`}>
//                             {order.status || 'pending'}
//                         </span>
//                     </div>
//                     <div className="text-right">
//                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Net Total</span>
//                         <span className="text-2xl font-black text-amber-400">Rs {order.total?.toLocaleString()}</span>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

import { FiX } from "react-icons/fi";
import react, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function OrderDetailsModal({ order, isOpen, onClose, isAdminView = false }) {
    const [status, setStatus] = useState("pending");
    const [notes, setNotes] = useState(""); 
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (order) {
            setStatus(order.status || "pending");
            setNotes(order.notes || ""); 
        }
    }, [order]);

    if (!isOpen || !order) return null;

    const handleUpdateOrder = async () => {
        setIsUpdating(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_API_URL}/orders/${order.orderId}`,
                { status, notes }, 
                { headers: { "Authorization": `Bearer ${token}` } }
            );
            toast.success("Order status updated successfully!");
            order.status = status;
            order.notes = notes;
            onClose(); 
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error(error?.response?.data?.message || "Failed to update order status.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        /* Glassmorphic Blur Background */
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto pt-24 transition-all duration-300">
            
            {/* Modal Card */}
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative mt-4 border border-slate-100">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-orange-500 hover:bg-slate-100 p-2 rounded-full transition-all duration-200"
                    title="Close Window"
                >
                    <FiX size={22} />
                </button>

                {/* Header */}
                <div className="border-b pb-3 mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Order Details</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        ID: <span className="font-mono font-bold text-slate-700">{order.orderId}</span> | Date: {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                    </p>
                </div>

                {/* Customer Info & Shipping Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Customer Info</h3>
                        <p className="text-sm font-bold text-slate-800">{order.firstName} {order.lastName}</p>
                        <p className="text-sm text-slate-600 mt-1">{order.email}</p>
                        <p className="text-sm text-slate-600">{order.phone}</p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Shipping Address</h3>
                        <p className="text-sm text-slate-700 font-medium">{order.addressLine1}</p>
                        {order.addressLine2 && <p className="text-sm text-slate-600">{order.addressLine2}</p>}
                        <p className="text-sm text-slate-700 mt-1">
                            {order.city}, {order.state}, {order.postalCode}
                        </p>
                    </div>
                </div>

                {/* Products List Ordered */}
                <div className="mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Items Ordered</h3>
                    <div className="space-y-3">
                        {order.products?.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between border border-slate-100 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg border border-slate-200 bg-white" />
                                    ) : (
                                        <div className="w-14 h-14 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-xs text-slate-400">No Img</div>
                                    )}
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">ID: {item.productId}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-700">Rs {item.price?.toLocaleString()} x {item.quantity}</p>
                                    <p className="text-xs font-semibold text-orange-500 mt-0.5">Total: Rs {(item.price * item.quantity)?.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🌟 වෙනස් කළ ස්ථානය: ඇඩ්මින් නම් පමණක් වෙනස් කිරීමට ඉඩ දීම, සාමාන්‍ය යූසර්ට View Only කිරීම */}
                <div className="mb-6 border-t pt-4 space-y-4">
                    {isAdminView ? (
                        /* 🟢 Admin කෙනෙක් ආවොත්: Dropdown + Textarea + Button තුනම පෙනේ */
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Change Order Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="bg-white border-2 border-slate-200 text-slate-700 px-3 py-2 rounded-lg focus:outline-none focus:border-orange-500 text-sm font-bold shadow-sm cursor-pointer"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                                <div className="flex flex-col justify-end h-full pt-5">
                                    <button
                                        onClick={handleUpdateOrder}
                                        disabled={isUpdating}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-md active:scale-95 disabled:opacity-50"
                                    >
                                        {isUpdating ? "Updating..." : "Update Order"}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Special Notes / Admin Comments</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add notes..."
                                    rows={3}
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-orange-500 transition-all resize-none font-medium text-slate-700"
                                />
                            </div>
                        </>
                    ) : (
                        /* 🔴 සාමාන්‍ය යූසර් ආවොත්: (My Orders) ඇඩ්මින් දාපු සටහන් තිබේ නම් පමණක් ඒවා ලස්සන Read-only box එකක පෙන්වයි */
                        order.notes && (
                            <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl">
                                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Message from Store / Tracking Details:</h4>
                                <p className="text-sm font-medium text-slate-700 whitespace-pre-line">{order.notes}</p>
                            </div>
                        )
                    )}
                </div>

                {/* Footer Summary */}
                <div className="border-t pt-4 flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl shadow-md">
                    <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Current Status</span>
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 ${
                            order.status === 'completed' || order.status === 'delivered' ? 'bg-green-500 text-white' :
                            order.status === 'pending' ? 'bg-amber-500 text-white' :
                            'bg-blue-500 text-white'
                        }`}>
                            {order.status || 'pending'}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Net Total</span>
                        <span className="text-2xl font-black text-amber-400">Rs {order.total?.toLocaleString()}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}