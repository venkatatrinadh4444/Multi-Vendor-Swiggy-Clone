import React from 'react';
import { Link } from 'react-router-dom';
import { useContextData } from '../../context/ContextData';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const loginPage=useNavigate(null)
  const {userData}=useContextData()
  const data=userData?.firm
  const userName=userData.username

  const clickHandle=(e)=> {
    e.preventDefault()
    toast('Please log in to access this page')
    loginPage('/login')
  }
  return (
    <div className='sideBar col-md-3 d-flex d-md-column d-row'>

   {!userName && !data&&<Link to="/add-firm" className='text-muted' onClick={clickHandle}>Add Firm</Link>}
   {userName && !data&&<Link to="/add-firm">Add Firm</Link>}
   {!userName?<Link to="/add-product" className='text-muted' onClick={clickHandle}>Add Product</Link>:<Link to="/add-product">Add Product</Link>}

   {!userName?<Link to="/all-products" className='text-muted' onClick={clickHandle}>All Products</Link>:<Link to="/all-products">All Products</Link>}

   {!userName?<Link to="/user-details" className='text-muted' onClick={clickHandle}>User Details</Link>:<Link to="/user-details">User Details</Link>}
    </div>
  )
}

export default Sidebar