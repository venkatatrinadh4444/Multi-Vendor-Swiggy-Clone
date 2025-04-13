import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState,useRef } from "react";
import axios from "axios";
import { API_URI } from "../../api's/Api";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    bestseller: false,
    description: "",
    image:""
  });
  const imageRef=useRef(null)
  const [category, setCategory] = useState([]);

  const categoryChangeHandler = (e) => {
    if (e.target.checked) setCategory([...category, e.target.value]);
    else
      setCategory((prev) => {
        const filteredCategories = prev.filter(
          (each) => each !== e.target.value
        );
        return filteredCategories;
      });
  };
  const imageChangeHandler = (e) => {
    if(e.target.files.length>0)
      setProductData({...productData,image:e.target.files[0]})
  };
  const textChangHandler = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const optionChangeHandler = (e) => {
    if (e.target.checked) setProductData({ ...productData, bestseller: true });
    else setProductData({ ...productData, bestseller: false });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", productData.name);
    data.append("price", productData.price);
    data.append("bestseller", productData.bestseller);
    data.append("description", productData.description);
    data.append("image", productData.image);
    if (category.length > 0)
      category.forEach((each) => {
        data.append("category", each);
      });
    else alert("You need to select atleast one category");

    axios.post(`${API_URI}/product/add-product`,data,{withCredentials:true,headers:{'Content-Type':'multipart/form-data'}}).then(res=>toast(res.data.msg)).catch(err=>toast(err.response.data.msg))
    setProductData({
      name: "",
      price: "",
      bestseller: false,
      description: "",
      image:""
    })
    setCategory([])
    imageRef.current.value=""
  };
  
  return (
    <>
      <div className="d-flex align-items-center addFirm justify-content-center col-lg-8 col-md-9 m-auto">
        <form className="p-4 shadow-lg rounded-1" onSubmit={submitHandler}>
        <h3 className="text-primary text-center p-0">Add Product</h3>
          <FloatingLabel
            controlId="floatingInput"
            label="Item name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="@"
              name="name"
              value={productData.name}
              onChange={textChangHandler}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPrice"
            label="Item price"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              name="price"
              value={productData.price}
              onChange={textChangHandler}
            />
          </FloatingLabel>

          <label className="form-label fw-semibold">Category</label>
          {["checkbox"].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check
                inline
                label="veg"
                name="group1"
                type={type}
                id={`inline-${type}-1`}
                value="veg"
                checked={category.includes('veg')}
                onChange={categoryChangeHandler}
              />
              <Form.Check
                inline
                label="non-veg"
                name="group1"
                type={type}
                id={`inline-${type}-2`}
                value="non-veg"
                checked={category.includes('non-veg')}
                onChange={categoryChangeHandler}
              />
            </div>
          ))}
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Bestseller"
            className="fw-semibold"
            checked={productData.bestseller}
            value={productData.bestseller}
            onChange={optionChangeHandler}
          />

          <Form.Group
            className="mb-3 mt-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={productData.description}
              onChange={textChangHandler}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="fw-semibold">Choose a item image</Form.Label>
            <Form.Control type="file" ref={imageRef} onChange={imageChangeHandler}/>
          </Form.Group>

          <div className="text-center mt-3">
            <button className="btn btn-primary" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
