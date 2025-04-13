import { useContextData } from "../../context/ContextData";
import moment from "moment";
import axios from "axios";
import { API_URI } from "../../api's/Api";
import { toast } from "react-toastify";

const UserDetails=()=> {
    const {userData}=useContextData()

    const deleteFirm=(id)=> {
        axios.delete(`${API_URI}/firm/delete-firm/${id}`).then(res=>toast(res.data.msg)).catch(err=>toast(err.response.data.msg))
    }
    return (
        <>
        <div className="col-md-9 d-flex align-items-center justify-content-center" style={{minHeight:"80vh"}}>
            <div className="p-4 rounded-1 shadow-lg col-md-8">
            <h5>{userData.username}</h5>
            <p>Email : {userData.email}</p>
            <p>Member since : {moment(userData.createdAt).format('DD/MM/YYYY')}</p>
            <h5>Firm Details</h5>
            {userData.firm?<table className="text-center align-middle table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Image</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{userData.firm?.firmName}</td>
                    <td>
                        <img src={userData.firm?.image} width="70px" height="60px" className="object-fit-coverm-0 p-0 rounded-1"/>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={()=>deleteFirm(userData.firm?._id)}>Delete</button>
                    </td>
                    </tr>
                </tbody>
            </table>:<p>Your account is not associated with any firm.Please create a firm to display it here.</p>}
            </div>
        </div>
        </>
    )
}
export default UserDetails