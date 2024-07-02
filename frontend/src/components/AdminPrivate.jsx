import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


function AdminPrivate(){
    
    const navigate=useNavigate()
    
    const {adminInfo} = useSelector(action=>action.admin.adminInfo)
    return adminInfo ? <Outlet/> : navigate('/admin')
    
}
export default AdminPrivate