import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";


function UserPrivate() {
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth)

    return userInfo ? <Outlet /> : navigate('/login')
}
export default UserPrivate