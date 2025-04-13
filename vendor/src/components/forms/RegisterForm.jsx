import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { API_URI } from "../../api's/Api";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const loginForm=useNavigate(null)
  const [data,setData]=useState({
    username:'',
    email:'',
    password:''
  })
  const changeHandler=(e)=> {
    setData({...data,[e.target.name]:e.target.value})
  }
  const [verifyBtn,setVerifyBtn]=useState(false)
  const [emailVerified,setEmailVerified]=useState(false)
  const [otp,setOtp]=useState('')

  const submitHandler=(e)=> {
    e.preventDefault()
    axios.post(`${API_URI}/vendor/register-vendor`,data).then(res=>{
      toast.success(res.data.msg)
      loginForm('/login')
    }).catch(err=>toast.error(err.response.data.msg))
    setData({
      username:'',
      email:'',
      password:''
    })
  }

  const sendingOtp=()=> {
    const {email}=data
    axios.post(`${API_URI}/verification/send-otp`,{email}).then(res=>toast.success(res.data.msg)).catch(err=>toast.error(err.response?.data.msg))
    setEmailVerified(true)
  }
  const otpVerification=()=> {
    const {email}=data
    axios.post(`${API_URI}/verification/verify-otp`,{email,otp}).then(res=>{
      setEmailVerified(false)
      setVerifyBtn(true)
      toast.success(res.data.msg)
    }).catch(err=>toast.error(err.response?.data.msg))
  }

  return (
    <>
      <div className="d-flex align-items-center registerForm justify-content-center col-md-5 m-auto">
        <form className="w-75 p-4 shadow-lg rounded-1" onSubmit={(e)=>e.preventDefault()}>
          <h3 className="text-success text-center p-0">Register Form</h3>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="username" name="username" value={data.username} onChange={changeHandler}/>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingEmail"
            label="Email address"
            className="mb-1"
          >
            <Form.Control type="email" placeholder="name@example.com" name="email" value={data.email} onChange={changeHandler}/>
            {verifyBtn?<button className="btn">Email verified</button>:<button className="btn text-decoration-underline text-light fw-semibold" onClick={sendingOtp}>Send otp</button>}
          </FloatingLabel>
          {emailVerified && <FloatingLabel controlId="floatingOTP" label="Enter OTP" className="mb-3">
            <Form.Control type="text" placeholder="Password" value={otp} onChange={e=>setOtp(e.target.value)}/>
            <div className="text-center">
           <button className="btn btn-dark mt-1" onClick={otpVerification}>Verify</button>
           </div>
          </FloatingLabel>}
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={changeHandler}/>
          </FloatingLabel>
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={submitHandler}>Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
