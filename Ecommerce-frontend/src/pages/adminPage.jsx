import { Route, Routes, Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex items-center bg-accent ">
      <div className="w-75 h-full bg-accent flex flex-col p-4">

        <Link to="/admin/" className="text-primary text-lg font-medium hover:text-secondary/80 transition-colors duration-200 mb-4">Orders</Link>
        <Link to="/admin/products" className="text-primary text-lg font-medium hover:text-secondary/80 transition-colors duration-200 mb-4">Products</Link>
        <Link to="/admin/users" className="text-primary text-lg font-medium hover:text-secondary/80 transition-colors duration-200 mb-4">Users</Link>
        <Link to="/admin/reviews" className="text-primary text-lg font-medium hover:text-secondary/80 transition-colors duration-200">Reviews</Link>

      </div>
      <div className="w-[calc(100%-300px)] h-full bg-primary p-4  border-8 border-accent rounded-2xl">

        <Routes>
          <Route path="/" element={<h1>Admin Dashboard</h1>} />
          <Route path="/products" element={<h1>Admin Products</h1>} />
          <Route path="/users" element={<h1>Admin Users</h1>} />
          <Route path="/reviews" element={<h1>Admin Reviews</h1>} />

        </Routes>



      </div>
    </div>
  );
}
