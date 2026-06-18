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

// 🌟 1. ඇඩ්මින්ලා විතරක් ඇතුළට ගන්නා ආරක්ෂක පවුර (Admin Route Guard)
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // Login වෙද්දී localStorage එකට දාපු isAdmin flag එක කියවීම
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 

  if (!token || !isAdmin) {
    // ඇඩ්මින් කෙනෙක් නොවී හොරෙන් එන්න හැදුවොත් Error එකක් දමා Login පේජ් එකට පන්නනවා
    setTimeout(() => toast.error("Access Denied: Admins Only!"), 100);
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="w-full h-screen flex flex-col bg-primary text-secondary">
      <Toaster position="top-right"/>
      
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
      
        {/* Pages without Header */}
        {/* 🌟 2. වෙනස් කළ ස්ථානය: AdminPage එක ආරක්ෂක පවුර (AdminRoute) මැදට දැමීම */}
        <Route 
          path="/admin/*" 
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />
        
        <Route path="/test/*" element={<Test />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <BottomNavbar />
    </div>
  )
}

export default App;