import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState} from "react";
import axios from "axios";
import { API_URI } from "../../api's/Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useContextData} from '../../context/ContextData'

const AddFirm = () => {
  const {userData,updateUserData}=useContextData()
  const addProduct=useNavigate(null)
  const [firmData,setFirmData]=useState({
    firmName:'',
    area:'',
    offer:'',
    image:''
  })
  const [region,setRegion]=useState([])
  const [category,setCategory]=useState([])

  const regionChangeHandler=(e)=> {
   if(e.target.checked)  {
    setRegion([...region,e.target.value])
   }
  else 
  setRegion(prev=>{
      const filterdArray=prev.filter(eachValue=>eachValue!==e.target.value)
      return filterdArray
  })
  }
  const categoryChangeHandler=(e)=> {
    if(e.target.checked)
      setCategory([...category,e.target.value])
    else 
      setCategory(prev=>{
        const filterdCategories=prev.filter(each=>each!==e.target.value)
        return filterdCategories
      })
  }

  const textChangeHandler=(e)=> {
    setFirmData({...firmData,[e.target.name]:e.target.value})
  }
  const fileChangeHandler=(e)=> {
    setFirmData({...firmData,image:e.target.files[0]})
  }

  const submitHandler=(e)=> {
    e.preventDefault()
    const data=new FormData()
    data.append('firmName',firmData.firmName)
    data.append('area',firmData.area)
    data.append('offer',firmData.offer)
    data.append('image',firmData.image)
    if(category.length>0){
      category.forEach(each=>{
        data.append('category',each)
      })
    }
    else {
      alert('You need to select atleast one category')
    }
    if(region.length>0){
      region.forEach(each=>{
        data.append('region',each)
      })
    }
    else {
      alert('You need to select atleast one region')
    }
    axios.post(`${API_URI}/firm/add-firm`,data,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}).then(res=>{
      toast.success(res.data.msg)
      console.log(res)
      updateUserData(res.data.vendor)
      addProduct('/add-product')
    }).catch(err=>toast(err.response.data.msg))
  }

  return (
    <>
      <div className="d-flex align-items-center addFirm justify-content-center col-lg-8 col-md-9 m-auto">
        <form className="p-4 shadow-lg rounded-1" onSubmit={submitHandler}>
        <h3 className="text-light text-center p-0">Add Firm</h3>
          <FloatingLabel
            controlId="floatingInput"
            label="Firm Name"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="@" name="firmName" value={firmData.firmName} onChange={textChangeHandler}/>
          </FloatingLabel>
          <FloatingLabel controlId="floatingArea" label="Area" className="mb-3">
            <Form.Control type="text" placeholder="name@example.com" name="area" value={firmData.area} onChange={textChangeHandler}/>
          </FloatingLabel>
          <label className="form-label fw-semibold">Category</label>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="veg"
                name="group1"
                type={type}
                id={`inline-${type}-1`} value="veg" onChange={categoryChangeHandler}
              />
              <Form.Check
                inline
                label="non-veg"
                name="group1"
                type={type}
                id={`inline-${type}-2`} value="non-veg" onChange={categoryChangeHandler}
              />
            </div>
          ))}
          <label className="form-label fw-semibold">Region</label>
          <div className="d-flex gap-2 flex-sm-row flex-column">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="label1" value="south-indian" onChange={regionChangeHandler}/>
              <label htmlFor="label1">South-Indian</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="label2" value="north-indian" onChange={regionChangeHandler}/>
              <label htmlFor="label2">North-Indian</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="label3" value="chinese" onChange={regionChangeHandler}/>
              <label htmlFor="label3">Chinese</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="label4" value="bakery" onChange={regionChangeHandler}/>
              <label htmlFor="label4">Bakery</label>
            </div>
          </div>
          <FloatingLabel
            controlId="floatingOffer"
            label="Offer"
            className="mb-3 mt-3"
          >
            <Form.Control type="text" placeholder="Offer" name="offer" value={firmData.offer} onChange={textChangeHandler}/>
          </FloatingLabel>
          <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className="fw-semibold mt-3">Choose a firm image</Form.Label>
        <Form.Control type="file" onChange={fileChangeHandler}/>
      </Form.Group>

          <div className="text-center mt-3">
            <button className="btn btn-dark text-light fw-semibold" type="submit">Add Firm</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFirm;
