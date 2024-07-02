import React, { useEffect, useState, } from "react";
import '../pages/admin.css'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersMutation, useDeleteuserMutation } from "../slices/adminApiSlices";
import { toast,ToastContainer } from "react-toastify";
 
import { userDetails } from "../slices/adminSlice";



const Adminhome = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])
    const [data, setData] = useState([])
    const { adminInfo } = useSelector((state) => state.admin)
    const [GetUsers] = useGetUsersMutation()
    const [Deleteuser] = useDeleteuserMutation()
    const [deleteUser, setDeleteUser] = useState(false)
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {

                const { data } = await GetUsers()
                setUserData(data.data)

            } catch (error) {
                console.log('error')
            }
        }
        fetchData()
    }, [GetUsers, adminInfo, Deleteuser,])
    useEffect(() => {
        setData(userData)


    }, [userData])

    const newDate = (dates) => {
        const isoDates = dates
        const date = new Date(isoDates)
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        const formattedDate = date.toLocaleDateString(undefined, options)
        return formattedDate
    }
    const editUser = (user) => {
       
            
            dispatch(userDetails(user))
            navigate('/editUser')
    }


    const removeUser = async (id) => {

        try {

            const res = await Deleteuser({ id }).unwrap()
            console.log(res)
            setDeleteUser(!Deleteuser)
            toast.success('user deleted successfully')

        } catch (error) {

        }
    }
   const filteredData=(letter)=>{
          setData(
            userData.filter((val)=>
                val.name.toLowerCase().includes(letter.toLowerCase())
            )
          ) && setData (
               userData.filter((val)=>
                        val.email.toLowerCase().includes(letter.toLowerCase())
               )
          )
   }

    return (

        <div className="mb-5 ">
         <ToastContainer/>
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="row">
              <div className="input-group">
                <div className="form-outline mt-3 ms-3 mb-3 border rounded">
                  <input
                    type="search"
                    id="form1"
                    className="form-control"
                    onChange={(e) => {
                      filteredData(e.target.value)
                    }}
                  />
                  <label className="form-label" htmlFor="form1">
                    Search
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="user-dashboard-info-box table-responsive mb-0 bg-white p-4 shadow-sm">
                  <table className="table manage-candidates-top mb-0">
                    <th className="fw-bold">Users</th>
                    <th className="text-end">Action</th>
                    {data.length ? (
                      data.map((val, i) => (
                        <>
                          <thead>
                            <tr>
                              <th className="action "></th>
                            </tr>
                          </thead>
                          <tbody key={i}>
                            <tr className="candidates-list">
                              <td className="title">
                                <div className="thumb">
                                  {val.profileImage ? (
                                    <img
                                      className="img-fluid"
                                      src={`http://localhost:8000/images/${val.profileImage}`}
                                      alt=""
                                    />
                                  ) : (
                                    <img
                                      className="img-fluid"
                                      src={`https://static.vecteezy.com/system/resources/previews/016/293/983/non_2x/profile-avatar-ui-element-template-user-account-editable-isolated-dashboard-component-flat-user-interface-visual-data-presentation-web-design-widget-for-mobile-application-with-dark-theme-vector.jpg`}
                                      alt=""
                                    />
                                  )}
                                </div>
                                <div className="candidate-list-details">
                                  <div className="candidate-list-info">
                                    <div className="candidate-list-title">
                                      <h5 className="mb-0">
                                        <p className="fw-bold">
                                          {val.name}{" "}
                                          <span className="ms-5 fw-normal">
                                            {" "}
                                            {val.email}
                                          </span>
                                        </p>
                                      </h5>
                                    </div>
                                    <div className="candidate-list-option">
                                      <ul className="list-unstyled">
                                        <li>
                                          <i className="" />
                                          🕗 {newDate(val.createdAt)}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <ul className="list-unstyled mb-0 d-flex justify-content-end">
                                  <li>
                                    <p onClick={()=>{
                                        editUser(val)
                                    }}
                                     
                                      className="text-info ms-3"
                                      data-toggle="tooltip"
                                      title=""
                                      data-original-title="Edit"
                                    >
                                      <i className="fas fa-pencil-alt" />
                                    </p>
                                  </li>
                                  <li>
                                    <p
                                      onClick={() =>
                                        removeUser(val._id)
                                      }
                                      className="text-danger ms-3"
                                      data-toggle="tooltip"
                                      title=""
                                      data-original-title="Delete"
                                    >
                                      <i className="far fa-trash-alt" />
                                    </p>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </>
                      ))
                    ) : (
                      <img
                        src="https://static.thenounproject.com/png/55393-200.png"
                        alt="No Users"
                      />
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
    


export default Adminhome
