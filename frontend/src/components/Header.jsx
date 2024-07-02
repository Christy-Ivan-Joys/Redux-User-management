import React from "react";
import './Header.css'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown, Badge } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlices";
import { logout } from "../slices/authSlices";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)

const [logoutApiCall]=useLogoutMutation()
const dispatch=useDispatch()
const navigate=useNavigate()

const logoutHandler=async()=>{
  try {
    await logoutApiCall().unwrap()
    dispatch(logout())
    navigate('/')
  } catch (error) {
    
  }
}
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <ul className="navbar">
        <Link to='/' className="home">
          <p >Home</p>
        </Link>

      </ul>

      <ul className="ms-auto d-flex gap-2 m-5" >
        {userInfo?.name ? (
          <>
          
            <NavDropdown title={userInfo.name} id='username' className="second ms-auto" >
              <LinkContainer to='/profile'>
                <NavDropdown.Item>
                  profile
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/logout'>
                <NavDropdown.Item  onClick={logoutHandler}>
                logout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          
          </>
        ) : (

          <>

            <Link to='/login'>
              <div className="nav-item" >
                <button className="button rounded-pill">Login</button>
              </div>
            </Link>
            <Link to='/register'>
              <div className="nav-item">
                <button className="button rounded-pill">Register</button>
              </div>
            </Link>
          </>
        )}

      </ul>

    </nav>
  )
}
export default Header