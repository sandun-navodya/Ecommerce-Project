
import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import ProductsPage from './pages/productsPage'
import ProductDetailPage from './pages/productDetailPage'
import ContactPage from './pages/contactPage'
import CartPage from './pages/cartPage'
import CheckoutPage from './pages/checkoutPage'
import Header from './components/header'
import Test from './components/test'
import { Toaster } from 'react-hot-toast'

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
      
        
        {/* Pages without Header */}
        <Route path="/admin/*" element={<AdminPage/>} />
        <Route path="/test/*" element={<Test/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </div>
  )
}

export default App
