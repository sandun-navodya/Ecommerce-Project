import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { Route, Routes, Navigate } from 'react-router-dom' // 🌟 Navigate එකතු කළා
import HomePage from './pages/homePage'
import ProductsPage from './pages/productsPage'
import ProductDetailPage from './pages/productDetailPage'
import ContactPage from './pages/contactPage'
import CartPage from './pages/cartPage'
import CheckoutPage from './pages/checkoutPage'
import Header from './components/header'
import Test from './components/test'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast' // 🌟 toast import කළා
import BottomNavbar from './components/bottomNavbar'
import MyOrdersPage from './pages/myOrders'
import SettingsPage from './pages/settingsPage'
import UserRegisterPage from './pages/userRegisterPage' // 🌟 UserRegisterPage import කළා



// 687394219055-e7tke2bpvknn257hbqf9t7gg50d8eilk.apps.googleusercontent.com
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token || !isAdmin) {

    setTimeout(() => toast.error("Access Denied: Admins Only!"), 100);
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    
      <div className="w-full h-screen flex flex-col bg-primary text-secondary">
        <Toaster position="top-right" />

        <Routes>
          {/* Pages with Header - Header persists, content changes */}
          <Route
            path="/"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <HomePage />
                </div>
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <ProductsPage />
                </div>
              </div>
            }
          />
          <Route
            path="/products/:productId"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <ProductDetailPage />
                </div>
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <ContactPage />
                </div>
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <CartPage />
                </div>
              </div>
            }
          />

          <Route
            path="/checkout"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <CheckoutPage />
                </div>
              </div>
            }
          />

          <Route
            path="/my-orders"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <MyOrdersPage />
                </div>
              </div>
            }
          />

          <Route
            path="/settings"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <SettingsPage />
                </div>
              </div>
            }
          />

          <Route
            path="/login"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <LoginPage />
                </div>
              </div>
            }
          />

          <Route
            path="/Register"
            element={
              <div className="flex flex-col h-full overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto">
                  <UserRegisterPage />
                </div>
              </div>
            }
          />

          {/* Admin Route - Protected */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />

          <Route path="/test/*" element={<Test />} />

        </Routes>
        <BottomNavbar />
      </div>
   
  )
}

export default App;