import React from 'react';
import swiggyLogo from '../../assets/swiggy.svg';
import { Link } from 'react-router-dom';
import { useContextData } from '../../context/ContextData';
import axios from 'axios';
import { API_URI } from '../../api\'s/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar=()=> {
    const navigateHome=useNavigate(null)
    const {userData,updateUserData}=useContextData()
    const userName=userData?.username

    const logoutHandler=()=> {
        axios.delete(`${API_URI}/vendor/logout-vendor`,{withCredentials:true}).then(res=>{
            toast.success(res.data.msg)
            updateUserData({})
            navigateHome('/')
        }).catch(err=>toast.error(err.response.data?.msg||"Something went wrong!"))
    }
    return (
        <div className='d-flex justify-content-between p-3 navbarComponent align-items-center'>
            <div className='d-flex align-items-center gap-2'>
                <img src={swiggyLogo} alt="logo" width="24px"/>
                <h5 className='m-0 text-white fs-5'><Link to="/" className='text-decoration-none text-light'>Vendor Dashboard
                </Link></h5>
            </div>
            <div className='d-none d-sm-block text-white'>
                <h6 className='m-0'>{userData?.firm?`Firm Name : ${userData.firm.firmName}`:""}</h6>
            </div>
            <div>
               {userName?<button className='btn btn-danger' onClick={logoutHandler}>Logout</button>:
               <><Link to="/login" className='text-decoration-none fw-bold text-white'>Login</Link>
                <span className='text-white'>/</span>
                <Link to="/register" className='text-decoration-none fw-bold text-white'>Register</Link>
                </>}
            </div>
        </div>
    )
}

export default Navbar