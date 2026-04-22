import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../../components/utils/mediaUpload";
import axios from "axios";
export default function AdminProductsPage() {

    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [stock, setStock] = useState(0);

    const handleAddImages = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            // Store File objects (not DataURLs) for proper upload to Supabase
            const newFiles = Array.from(files).map((file) => ({
                file: file,
                preview: URL.createObjectURL(file)
            }));
            setImages(prevImages => [...prevImages, ...newFiles]);
            e.target.value = "";
        }
    };

    async function handleSave() {
        try {
            // Validation
            if (!productId.trim()) {
                toast.error("Product ID is required.");
                return;
            }
            if (!name.trim()) {
                toast.error("Product Name is required.");
                return;
            }
            if (!category) {
                toast.error("Category is required.");
                return;
            }
            if (!price) {
                toast.error("Price is required.");
                return;
            }
            if (!stock) {
                toast.error("Stock is required.");
                return;
            }
            if (images.length === 0) {
                toast.error("Please add at least one product image.");
                return;
            }

            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("You must be logged in to perform this action.");
                window.location.href = "/login";
                return;
            }

            const mediaUrl = [];

            for (let i = 0; i < images.length; i++) {
              
                mediaUrl.push(mediaUpload(images[i].file));
               
            }

            const urls = await Promise.all(mediaUrl);
            console.log("All uploaded image URLs:", urls);

            const altNamesArray = altNames.split(",")//.map(name => name.trim()).filter(name => name !== "");

            const productData = {
                productId: productId,
                name: name,
                altNames: altNamesArray,
                price: parseFloat(price),
                labelledPrice: parseFloat(labelledPrice),
                description: description,
                Images: urls,
                brand: brand,
                model: model,
                category: category,
                isAvailable: isAvailable,
                stock: parseInt(stock)
            };

            console.log("Product data being sent:", productData);

            await axios.post(`${import.meta.env.VITE_API_URL}/products`, productData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            toast.success("Product added successfully!");
            // Reset form fields
            setProductId("");
            setName("");
            setAltNames("");
            setPrice("");
            setLabelledPrice("");
            setDescription("");
            setImages([]);
            setBrand("");
            setModel("");
            setCategory("");
            setIsAvailable(true);
            setStock(0);

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to upload images. Please try again.");
            
        }




    }
    return (
        <div className="w-full h-full flex justify-center overflow-y-auto bg-white p-6 shadow-lg rounded-lg">
            <div className="w-full h-full flex flex-col ">
                <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center pb-4 border-b-4 border-blue-500">
                    Add New Product
                </h2>

                <form className="space-y-6 flex-1 flex flex-col" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    {/* Grid Layout for Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {/* Product ID */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Product ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                placeholder="Enter unique product ID"
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        {/* Product Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            >
                                <option value="">Select a category</option>
                                <option value="Electronics">Laptop</option>
                                <option value="Fashion">Desktops</option>
                                <option value="Home">Monitors</option>
                                <option value="Sports">Accesories</option>
                                <option value="Books">Other</option>
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Brand
                            </label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                placeholder="Enter brand name"
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        {/* Model */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Model
                            </label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="Enter model"
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Price (₹) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                step="0.01"
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        {/* Labelled Price */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Labelled Price (₹)
                            </label>
                            <input
                                type="number"
                                value={labelledPrice}
                                onChange={(e) => setLabelledPrice(e.target.value)}
                                placeholder="0.00"
                                step="0.01"
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        {/* Stock */}
                        <div className="flex flex-col gap-2">
                            <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                                Stock <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                placeholder="0"
                                min="0"
                                className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                            />
                        </div>

                        {/* Is Available */}
                        <div className="flex items-center gap-3 pt-6">
                            <input
                                type="checkbox"
                                id="isAvailable"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="w-5 h-5 accent-blue-500 cursor-pointer rounded"
                            />
                            <label htmlFor="isAvailable" className="text-slate-700 font-semibold text-sm uppercase tracking-wider cursor-pointer">
                                Product Available
                            </label>
                        </div>
                    </div>

                    {/* Description - Full Width */}
                    <div className="flex flex-col gap-2">
                        <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter product description"
                            rows="4"
                            className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-vertical min-h-24"

                        ></textarea>
                    </div>

                    {/* Alternative Names - Full Width */}
                    <div className="flex flex-col gap-2">
                        <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                            Alternative Names
                        </label>
                        <input
                            type="text"
                            value={altNames}
                            onChange={(e) => setAltNames(e.target.value)}
                            placeholder="Enter alternative names (comma-separated)"
                            className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                        />
                    </div>

                    {/* Images - Full Width */}
                    <div className="flex flex-col gap-2 ">
                        <label className="text-slate-700 font-semibold text-sm uppercase tracking-wider">
                            Product Images
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleAddImages}
                            className="px-4 py-3 border-2 border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                        />
                        <p className="text-xs text-slate-500 mt-1">Total images: {images.length}</p>
                    </div>

                    {/* Uploaded Images Gallery */}
                    {images.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={image.preview}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg border-2 border-slate-200 hover:border-blue-500 transition-all duration-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex flex-col md:flex-row gap-3 justify-center mt-auto pt-8 border-t-2 border-slate-200">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-green-500 text-white font-bold rounded-lg uppercase tracking-wider transition-all duration-300 hover:bg-green-600 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 flex-1 md:max-w-xs m-2"
                        >
                            Create Product
                        </button>
                        <button
                            type="reset"
                            className="px-8 py-3 bg-slate-400 text-white font-bold rounded-lg uppercase tracking-wider transition-all duration-300 hover:bg-slate-500 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 flex-1 md:max-w-xs m-2"
                        >
                            Reset Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}