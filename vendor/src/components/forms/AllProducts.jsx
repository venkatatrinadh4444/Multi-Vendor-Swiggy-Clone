import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { API_URI } from "../../api's/Api";
import { toast } from "react-toastify";
import { Table } from "react-bootstrap";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URI}/product/get-products`, { withCredentials: true })
      .then((res) => setProducts(res.data.products))
      .catch((err) => toast(err.response.data.msg));
  }, []);
  
  const deleteHandler=(id)=> {
    axios.delete(`${API_URI}/product/delete-product/${id}`).then(res=>{
        setProducts(prev=>{
            const filteredProducts=prev.filter(each=>each._id!==id)
            return filteredProducts
        })
        toast.success(res.data.msg)
    }).catch(err=>toast.error(err.response.data.msg))

  }

  return (
    <>
      <div className="col-sm-9 m-auto">
        {products.length > 0 ? (
          <Table className="table table-light mt-3 shadow-lg">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {products.map((item,index) => {
                return (
                  <tr key={item._id}>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <img src={item.image} alt={item.name} width="60" height="60px" className="object-fit-cover rounded-2" />
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={()=>deleteHandler(item._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div className="text-center mt-5">
            <h5>No products found!</h5>
            <p>Add some items to firm to show here...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
