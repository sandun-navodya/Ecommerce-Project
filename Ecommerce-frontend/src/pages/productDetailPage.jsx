import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { FiChevronLeft } from 'react-icons/fi';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products/${id}`
                );
                console.log('Product detail response:', response.data);
                console.log('Image field:', response.data.Images?.[0] || response.data.image);
                setProduct(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to load product details. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        if (product && product.stock > 0) {
            console.log(`Added ${quantity} of ${product.name} to cart`);
            // TODO: Implement actual add to cart functionality
        }
    };

    const handleQuantityChange = (value) => {
        if (value > 0 && value <= (product?.stock || 0)) {
            setQuantity(value);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full bg-primary text-secondary p-8 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                    <p className="text-lg">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="w-full bg-primary text-secondary p-8 min-h-screen">
                <button
                    onClick={() => navigate('/products')}
                    className="flex items-center gap-2 text-accent hover:text-orange-600 mb-6"
                >
                    <FiChevronLeft size={20} />
                    Back to Products
                </button>
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
                    <p>{error || 'Product not found.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-primary text-secondary p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/products')}
                    className="flex items-center gap-2 text-accent hover:text-orange-600 mb-8 font-medium"
                >
                    <FiChevronLeft size={20} />
                    Back to Products
                </button>

                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-4">
                            <img
                                src={product.Images?.[selectedImageIndex] || product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        
                        {/* Image Thumbnails */}
                        {product.Images && product.Images.length > 1 && (
                            <div className="flex gap-2">
                                {product.Images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImageIndex === idx 
                                                ? 'border-accent' 
                                                : 'border-gray-300 hover:border-accent'
                                        }`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`${product.name} view ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        {/* Product Title */}
                        <div>
                            <h1 className="text-4xl font-bold text-secondary mb-4">
                                {product.name}
                            </h1>

                            {/* Category */}
                            {product.category && (
                                <p className="text-sm text-gray-600 mb-4">
                                    Category: <span className="font-medium text-secondary">{product.category}</span>
                                </p>
                            )}

                            {/* Rating Placeholder */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <span className="text-gray-600 text-sm">(0 reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <p className="text-5xl font-bold text-accent">
                                    Rs. {typeof product.price === 'string' ? product.price : product.price?.toLocaleString()}
                                </p>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-secondary mb-2">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Specifications */}
                            {product.specifications && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-secondary mb-3">Specifications</h3>
                                    <ul className="space-y-2 text-gray-700">
                                        {typeof product.specifications === 'string' ? (
                                            <li>{product.specifications}</li>
                                        ) : (
                                            Object.entries(product.specifications).map(([key, value]) => (
                                                <li key={key} className="flex justify-between">
                                                    <span className="font-medium">{key}:</span>
                                                    <span>{value}</span>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Stock & Purchase Section */}
                        <div className="border-t border-gray-200 pt-6">
                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.stock > 0 ? (
                                    <span className="inline-block bg-green-50 text-green-600 px-4 py-2 rounded-lg font-medium">
                                        In Stock ({product.stock} available)
                                    </span>
                                ) : (
                                    <span className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            {product.stock > 0 && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-secondary mb-2">
                                        Quantity:
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            className="bg-gray-200 hover:bg-gray-300 text-secondary px-3 py-2 rounded font-bold"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                            min="1"
                                            max={product.stock}
                                            className="border border-gray-300 w-16 text-center px-2 py-2 rounded"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            className="bg-gray-200 hover:bg-gray-300 text-secondary px-3 py-2 rounded font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                                        product.stock > 0
                                            ? 'bg-accent hover:bg-orange-600 active:scale-95'
                                            : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    <FaShoppingCart size={20} />
                                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                </button>

                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 border-2 ${
                                        isFavorite
                                            ? 'border-accent text-accent bg-orange-50'
                                            : 'border-gray-300 text-gray-600 hover:border-accent hover:text-accent'
                                    }`}
                                >
                                    <FaHeart size={20} style={{ opacity: isFavorite ? 1 : 0.4 }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
