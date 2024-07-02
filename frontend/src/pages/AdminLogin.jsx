import React, { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAdminloginMutation } from "../slices/adminApiSlices";
import { useNavigate } from "react-router-dom";
import { setAdminCredentials } from "../slices/adminSlice";
import { toast } from "react-toastify";


const Adminlogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const  {adminInfo}  = useSelector((state) => state.admin)
    console.log(adminInfo,'Adminingoooo login')
    const [Adminlogin] = useAdminloginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (adminInfo) {
        navigate('/adminHome')
        }
    },[adminInfo,navigate])


    const handleSubmit = async (event) => {
        event.preventDefault()
        if(email===''){
            toast.error('Enter the gmail')
            return
        }else if(password===''){
            toast.error('Enter the password')
            return
        }else if(email && password ===''){
            toast.error('Enter the gmail and password')
            return
        }

        try {
          
            const res = await Adminlogin({ email,password }).unwrap()
            
            dispatch(setAdminCredentials({...res}))
            navigate('/adminHome')

        } catch (error) {

        }


    }

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='enter the email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter the password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3" >Login</Button>
            </Form>
        </FormContainer>
    )
}
export default Adminlogin