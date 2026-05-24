import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";



export default function AdminProductsPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(import.meta.env.VITE_API_URL + "/products", {
      headers: {
        "Authorization": "Bearer " + token
      }
    })
      .then((response) => {
        console.log("Fetched products:", response.data);
        // Handle different response formats
        const productsData = response.data?.products || response.data || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      toast.success("Product deleted successfully!");
      // Remove product from state
      setProducts(products.filter(product => product.productId !== productId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete product.");
      console.error("Error deleting product:", error);
    }
  };




  return (

    <div className="p-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Products</h2>
            <p className="text-gray-600">Please wait while we fetch your products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] bg-gray-50 rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Products Found</h2>
            <p className="text-gray-600 text-lg mb-8">You haven't added any products yet. Start by adding your first product!</p>

          </div>
        </div>
      ) : (
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-80px)] shadow-md rounded-lg">
          <table className="w-full border-collapse bg-white">
            <thead className="sticky top-0 bg-gray-200 z-10">
              <tr className="text-left">
                <th className="px-6 py-3 font-semibold text-gray-700">Product ID</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Image</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Labelled Price</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Brand</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Model</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Available</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Stock</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.productId} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700">{item.productId}</td>
                  <td className="px-6 py-4">
                    {item.Images && item.Images.length > 0 ? (
                      <img src={item.Images[0]} alt={item.name} className="h-16 w-16 object-cover rounded" />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gray-700">Rs {item.price}</td>
                  <td className="px-6 py-4 text-gray-700">Rs {item.labelledPrice}</td>
                  <td className="px-6 py-4 text-gray-700">{item.brand}</td>
                  <td className="px-6 py-4 text-gray-700">{item.model}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.isAvailable ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.stock}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                      title="Edit product"
                    >
                      <Link to={"/admin/edit-product"} state={{ product: item }} className="flex items-center gap-1">
                      
                        <MdEdit className="text-lg" />
                        Edit
                      </Link>
                    </button>
                    <button
                      onClick={() => handleDelete(item.productId)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                      title="Delete product"
                    >
                      <MdDelete className="text-lg" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/admin/add-product" className="fixed bottom-8 right-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-accent/80 transition-all duration-200">
        <IoIosAdd className="text-white text-3xl" />
      </Link>

    </div>
  );
}