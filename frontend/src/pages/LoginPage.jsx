import { useEffect, useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { Form,Button,Col,Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useDispatch,useSelector}  from 'react-redux'
import {useLoginMutation} from '../slices/userApiSlices'
import { setCredentials } from "../slices/authSlices";
import {toast} from 'react-toastify'

const LoginPage=()=>{

const[email,setEmail]=useState('')
const[password,setPassword]=useState('')

const navigate=useNavigate()
const dispatch=useDispatch()

const [login,{isLoading}]=useLoginMutation()
const {userInfo}=useSelector((state)=> state.auth)


useEffect(()=>{
    if(userInfo){
        
        navigate('/')
        
    }
})

const handleSubmit= async (e)=>{
    alert('login')
    e.preventDefault()
   

    try {
        console.log('reached')
        console.log(email,password)
        const res=await login({email,password}).unwrap()
        dispatch(setCredentials({...res}))
        navigate('/')

    } catch (err) {
     
        toast.error(err?.data?.message || err.error)
        console.log('error in login  in loginPage',err?.data?.message || err.error)
    }
}


    return( 
       
        <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="email" >
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="enter the email" value={email} onChange={(e)=>setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
                <Form.Label>
                    Password
                </Form.Label>
                <Form.Control type="password" placeholder="enter the password" value={password} onChange={(e)=>setPassword(e.target.value)} >

                </Form.Control>

            </Form.Group>
        <Button type="submit" variant="primary" className="mt-3"> Login</Button>
        <Row className="py-3">
            <Col>
              New Customer ? <Link to='/register'>Register</Link>
            </Col>
        </Row>
        </Form>
        </FormContainer>
     
        
    )
}
export default LoginPage