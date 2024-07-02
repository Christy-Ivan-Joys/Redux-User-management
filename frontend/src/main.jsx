import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Signup from './pages/SignUpPage.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import Profile from './pages/Profile.jsx'
import EditProfile from './pages/EditProfilePage.jsx'
import Adminlogin from './pages/AdminLogin.jsx'
import Adminhome from './pages/AdminHome.jsx'
import AdminPrivate from './components/AdminPrivate.jsx'
import UserPrivate from './components/UserPrivate.jsx'
import EditUser from './pages/EditUser.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <>

      <Route path='/adminHome' element={<Adminhome />}></Route>

      <Route path='/' element={<App />}>

        <Route index={true} path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/editUser' element={<EditUser/>} /></Route>
      <Route path='/logout'></Route>
      <Route path='/update' element={<EditProfile />}></Route>
      <Route path='/admin' element={<Adminlogin />}></Route>
      <Route path='/adminHome' element={<Adminhome />}></Route>
      <Route path='' element={<UserPrivate />}>
        <Route path='profile' element={<Profile />}></Route>
      </Route>
    </>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
