
import './App.css'
import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import Test from './components/test'
import { Toaster } from 'react-hot-toast'
function App() {


  return (
<div className="w-full h-screen flex flex-col items-center justify-center bg-primary text-secondary">
  <Toaster position="top-right"/>

  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/admin/*" element={<AdminPage/>} />
     <Route path="/test/*" element={<Test/>} />
      <Route path="/login" element={<LoginPage/>} />
  </Routes>
  </div>
  )
}

export default App
