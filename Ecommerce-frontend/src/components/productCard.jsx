export default function ProductCard({ name, image, price }) {
  return (
    <div className="group relative bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col max-w-sm">
      
      {/* Image Container with Hover Zoom */}
      <div className="overflow-hidden rounded-xl bg-slate-100 aspect-square mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          Category
        </h3>
        <h2 className="text-xl font-bold text-slate-900 mb-2 truncate">
          {name}
        </h2>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-2xl font-semibold text-slate-900">
            ${price}
          </span>
          <button className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-slate-200">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}