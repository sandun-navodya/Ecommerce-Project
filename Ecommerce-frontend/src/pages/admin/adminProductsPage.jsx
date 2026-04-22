import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";



export default function AdminProductsPage() {

  const [products, setProducts] = useState([]);

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
      });
  }, []);




  return (

    <div className="p-6">
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
                <td className="px-6 py-4 text-gray-700">${item.price}</td>
                <td className="px-6 py-4 text-gray-700">${item.labelledPrice}</td>
                <td className="px-6 py-4 text-gray-700">{item.brand}</td>
                <td className="px-6 py-4 text-gray-700">{item.model}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${item.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isAvailable ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link to="/admin/add-product" className="fixed bottom-8 right-8 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-accent/80 transition-all duration-200">
        <IoIosAdd className="text-white text-3xl" />
      </Link>

    </div>
  );
}