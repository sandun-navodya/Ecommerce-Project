import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination States
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [orderCount, setOrderCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setLoading(true);

        axios.get(`${import.meta.env.VITE_API_URL}/orders/${pageSize}/${pageNumber}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then((response) => {
                console.log("Fetched orders:", response.data.orders);
                const ordersData = response.data?.orders || response.data || [];
                setOrders(Array.isArray(ordersData) ? ordersData : []);

                if (response.data?.totalPages) {
                    setTotalPages(response.data.totalPages);
                }
                if (response.data?.orderCount !== undefined) {
                    setOrderCount(response.data.orderCount);
                }
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                toast.error("Failed to load orders.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pageNumber, pageSize]);

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value, 10));
        setPageNumber(1);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setPageNumber(i)}
                    // 🌟 UI වෙනස් කිරීම: පසුබිම ලා පැහැති නිසා Active එක Orange සහ අනෙක්වා Dark Slate කළා
                    className={`px-3 py-1 font-bold text-base rounded transition-all duration-200 ${pageNumber === i
                            ? "text-orange-500 border-b-2 border-orange-500 scale-110"
                            : "text-slate-600 hover:text-orange-500"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        /* 🌟 1. වෙනස් කළ ස්ථානය: 'flex flex-col justify-between' අයින් කළා. දැන් පේජ් එක auto layout වෙනවා */
        <div className="p-6 w-full">

            {/* Top Section: Header & Total Orders Count */}
            {!loading && (
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Orders</h1>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Orders:</span>
                        <span className="text-lg font-bold text-slate-800">{orderCount}</span>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50 rounded-lg shadow-md">
                    <div className="text-center">
                        <div className="mb-4">
                            <div className="inline-block">
                                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Orders</h2>
                        <p className="text-gray-600">Please wait while we fetch your orders...</p>
                    </div>
                </div>
            ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-50 rounded-lg shadow-md">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Found</h2>
                        <p className="text-gray-600 text-lg mb-8">There are no orders placed in the system yet.</p>
                    </div>
                </div>
            ) : (
                /* 🌟 2. වෙනස් කළ ස්ථානය: Table එක සහ Pagination එක දෙකම මේ එකම සුදු පාට rounded box එක ඇතුළට ගත්තා */
                <div className="shadow-lg rounded-xl bg-white border border-gray-200 overflow-hidden">

                    {/* Table Container */}
                    <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-260px)]">
                        <table className="w-full border-collapse bg-white">
                            <thead className="sticky top-0 bg-gray-200 z-10">
                                <tr className="text-left">
                                    <th className="px-6 py-3 font-semibold text-gray-700">Order ID</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Customer Name</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Phone</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">City</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Date</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Total Price</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item) => (
                                    <tr key={item.orderId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-700 font-medium">{item.orderId}</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {item.firstName} {item.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{item.email}</td>
                                        <td className="px-6 py-4 text-gray-700">{item.phone}</td>
                                        <td className="px-6 py-4 text-gray-700">{item.city}</td>
                                        <td className="px-6 py-4 text-gray-700">
                                            {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 font-bold text-accent">
                                            Rs {item.total?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-blue-100 text-blue-800'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 ml-4 flex items-center gap-2">
                                            <button
                                                onClick={() => console.log("View order details:", item.orderId)} // අවශ්‍ය නම් පසුව ලොජික් එකක් දාන්න පුළුවන්
                                                className="text-slate-600 hover:text-orange-500 transition-colors duration-200 p-1 rounded-lg hover:bg-slate-100"
                                                title="View Order Details"
                                            >
                                                <FiEye size={20} />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {orders.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">

                            {/* Dropdown */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                                <span>Show</span>
                                <select
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                    className="bg-white border-2 border-gray-200 text-gray-700 px-3 py-1 rounded-lg focus:outline-none focus:border-orange-500 transition cursor-pointer text-sm font-bold shadow-sm"
                                >
                                    <option value={5}>5 Orders</option>
                                    <option value={10}>10 Orders</option>
                                    <option value={20}>20 Orders</option>
                                    <option value={50}>50 Orders</option>
                                </select>
                            </div>


                            <div className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">

                                <button
                                    disabled={pageNumber === 1}
                                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                    className="p-1.5 text-gray-400 hover:text-orange-500 disabled:opacity-30 transition"
                                >
                                    <FiChevronLeft size={18} />
                                </button>


                                <div className="flex items-center gap-1 mx-1">
                                    {renderPageNumbers()}
                                </div>


                                <button
                                    disabled={pageNumber === totalPages}
                                    onClick={() => setPageNumber(prev => Math.min(prev + 1, totalPages))}
                                    className="p-1.5 text-gray-400 hover:text-orange-500 disabled:opacity-30 transition"
                                >
                                    <FiChevronRight size={18} />
                                </button>
                            </div>

                            {/* Status Text */}
                            <div className="text-sm font-bold text-gray-500">
                                Page <span className="text-orange-500">{pageNumber}</span> of {totalPages}
                            </div>

                        </div>
                    )}
                </div>
            )}

            {/* Floating Plus Button */}
            <Link to="/admin/add-product" className="fixed bottom-8 right-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-accent/80 transition-all duration-200 z-20">
                <IoIosAdd className="text-white text-3xl" />
            </Link>
        </div>
    );
}