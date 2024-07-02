import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEditUserMutation } from "../slices/adminApiSlices";
import { useSelector } from "react-redux";
import './Profile.css'
import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const EditUser = () => {
    const { userForEdit } = useSelector((state) => state.admin);
   console.log('userfor edittttttt',userForEdit)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [EditUser] = useEditUserMutation();
    const [name, setName] = useState(userForEdit.name)
  
    const [email, setEmail] = useState(userForEdit.email);
    const { adminInfo } = useSelector((state) => state.auth)
    const [update, setUpdate] = useState(false)

const handleSubmit=async(e,data)=>{

    e.preventDefault()
    const res= await EditUser({
        _id:userForEdit._id,
        name:name,
        email:email
    })
   
    navigate('/adminHome')
    toast.success('Updated successfully')

}

    useEffect(()=>{
        if(!userForEdit){
            navigate('/admin')
        }
        if(!userForEdit.name){
            navigate('/adminHome')
        }
    },[adminInfo,userForEdit.name])

    return (
        <div>
            <ToastContainer/>
            <div className="padding">
                <div className="col-md-8">
                    <div className="card">
                        <img
                            className="card-img-top"
                            src="data:image/jpeg;base64,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"
                            alt="Card image cap"
                        // onClick={banner}
                        />
                        <div className="card-body little-profile text-center">
                            <form onSubmit={handleSubmit}> 
                                <div className="pro-img">
                                    {userForEdit.profileImage ? (
                                        <img
                                            src={`http://localhost:8000/images/${userForEdit.profileImage}`}
                                            alt="user"
                                        />
                                    ) : (
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/016/293/983/non_2x/profile-avatar-ui-element-template-user-account-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-dark-theme-vector.jpg"
                                            alt="user"
                                        />
                                    )}
                                </div>
                                <input

                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder=" Name..."
                                    className="mt-0 border-0 rounded"
                                    style={{
                                        width: "75%",
                                        height: "40px",
                                        background: "rgba(200, 200, 200, 0.5)",
                                    }}
                                />

                                <input
                                    className="mt-2 border-0 rounded"
                                    style={{
                                        width: "75%",
                                        height: "40px",
                                        background: "rgba(200, 200, 200, 0.5)",
                                    }}

                                    placeholder="Email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />



                                <button
                                    type="submit"
                                    className="btn-update btn-outline-dark mt-3"
                                    style={{
                                        fontSize: "1rem",
                                        background: "rgba(200, 200, 200, 0.5)",
                                    }}
                                >
                                    Update
                                </button>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditUser