import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import AddFirm from './components/forms/AddFirm';
import AddProduct from './components/forms/AddProduct';
import { ToastContainer } from 'react-toastify';
import Welcome from './components/forms/welcome';
import AllProducts from './components/forms/AllProducts';
import UserDetails from './components/forms/UserDetails';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}>
      <Route index element={<Welcome/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/add-firm" element={<AddFirm/>}/>
      <Route path="/add-product" element={<AddProduct/>}/>
      <Route path="/all-products" element={<AllProducts/>}/>
      <Route path="/user-details" element={<UserDetails/>}/>
      </Route>
    </Routes>
    <ToastContainer theme='dark'/>
    </BrowserRouter>
  )
}

export default App