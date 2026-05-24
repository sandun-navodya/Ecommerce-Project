import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ id, name, images, image, price, stock = 0 }) {
    const [hovered, setHovered] = useState(false);
    
    // Handle both single image and images array
    const imageArray = Array.isArray(images) ? images : (image ? [image] : []);
    const primaryImage = imageArray[0];
    const secondaryImage = imageArray[1];

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`Added ${name} to cart`);
        // TODO: Implement add to cart functionality
    };

    return (
        <Link to={`/products/${id}`} className="no-underline">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer transform hover:scale-105">
                {/* Product Image */}
                <div 
                    className="relative h-64 bg-gray-200 overflow-hidden"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Primary Image */}
                    <img 
                        src={primaryImage} 
                        alt={name}
                        className={`absolute w-full h-full object-cover transition-all duration-300 ${
                            hovered && secondaryImage ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    
                    {/* Secondary Image on Hover */}
                    {secondaryImage && (
                        <img 
                            src={secondaryImage} 
                            alt={`${name} view 2`}
                            className={`absolute w-full h-full object-cover transition-all duration-300 ${
                                hovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        />
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                    {/* Product Name */}
                    <h3 className="text-base font-semibold text-secondary line-clamp-2 mb-3 hover:text-accent">
                        {name}
                    </h3>

                    {/* Price */}
                    <div className="mb-4 flex-1">
                        <p className="text-xl font-bold text-accent">
                            Rs. {typeof price === 'string' ? price : price?.toLocaleString()}
                        </p>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-3">
                        {stock > 0 ? (
                            <span className="inline-block text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                In Stock ({stock})
                            </span>
                        ) : (
                            <span className="inline-block text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        disabled={stock === 0}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-3 rounded-lg font-medium transition-all duration-300 ${
                            stock > 0
                                ? 'bg-accent text-white hover:bg-orange-600 active:scale-95'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        <FaShoppingCart size={20} />
                        <span className="text-sm">{stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}
