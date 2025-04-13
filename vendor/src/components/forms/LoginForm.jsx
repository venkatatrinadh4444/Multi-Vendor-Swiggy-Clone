import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { API_URI } from "../../api's/Api";
import { toast } from "react-toastify";
import { useContextData } from "../../context/ContextData";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigateHome=useNavigate(null)
  const {updateUserData}=useContextData()

  const [data,setData]=useState({
    email:'',
    password:''
  })
  const changeHandler=(e)=> {
    setData({...data,[e.target.name]:e.target.value})
  }

  const submitHandler=(e)=> {
    e.preventDefault()
    axios.post(`${API_URI}/vendor/login-vendor`,data,{withCredentials:true}).then(res=>{
      toast.success(res.data.msg)
      updateUserData(res.data.vendorDetails)
      navigateHome('/')
    }).catch(err=>toast.error(err.response.data.msg))
    setData({
        email:'',
        password:''
    })
  }

  return (
    <>
      <div className="d-flex align-items-center registerForm justify-content-center col-md-5 m-auto">
        <form className="w-75 p-4 shadow-lg rounded-1" onSubmit={submitHandler}>
        <h3 className="text-primary text-center p-0">Login Form</h3>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" name="email" value={data.email} onChange={changeHandler}/>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={changeHandler}/>
          </FloatingLabel>
          <div className="text-center mt-3">
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
