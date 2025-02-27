import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import { Outlet } from "react-router-dom"
import{ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>  
      <Header />
      <ToastContainer/>
     <Outlet/>
    </>
  )
}
export default App