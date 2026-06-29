import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'  

import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId="687394219055-e7tke2bpvknn257hbqf9t7gg50d8eilk.apps.googleusercontent.com">
      <App/>
      </GoogleOAuthProvider>
    </BrowserRouter>
   
  </StrictMode>,
)
