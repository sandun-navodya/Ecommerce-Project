import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/productCard';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [isloading, setisLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setisLoading(true);
            try {
                const response = await axios.get(import.meta.env.VITE_API_URL + "/products");
                console.log('Full response data:', response.data);
                if (response.data && response.data.length > 0) {
                    console.log('First product object:', response.data[0]);
                    console.log('Available fields:', Object.keys(response.data[0]));
                }
                setProducts(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError('Failed to load products. Please try again later.');
            } finally {
                setisLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isloading) {
        return (
            <div className="w-full bg-primary text-secondary p-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-lg">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-primary text-secondary p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 text-secondary">Our Products</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {products.length === 0 && !error ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">No products available.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <div key={product._id || product.id} className="relative">
                                {product.stock > 0 && (
                                    <div className="absolute top-2 left-2 z-10">
                                        <span className="bg-white border-2 border-accent text-accent px-3 py-1 rounded-full text-sm font-medium">
                                            In Stock
                                        </span>
                                    </div>
                                )}
                                <ProductCard
                                    key={product._id}
                                    id={product._id}
                                    productId={product.productId}
                                    name={product.name}
                                    price={product.price}
                                    stock={product.stock} 
                                    labelledPrice={product.labelledPrice}
                                    images={product.Images}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
