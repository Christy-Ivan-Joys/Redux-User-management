import { useState } from "react";
import { Form,Button,Row,Col} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {useRegisterMutation} from '../slices/userApiSlices'
import { useNavigate } from "react-router-dom";

const Signup=()=>{
    const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const[confirmPassword,setConfirmPassword]=useState('')
const [register,{isLoading}]=useRegisterMutation()
const navigate=useNavigate()

const handleSubmit=async (e)=>{
   
    e.preventDefault()  

    try {
        console.log(name,email,password)
        const res=await register({name,email,password}).unwrap()
        console.log(res)
        
        navigate('/login')
    } catch (error) {
        console.log(error)
    }
    
}
    return(
     <FormContainer>
        <h1>Register</h1>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="enter your name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>

           <Form.Group className="my-2" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="enter the email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>

        </Form.Group>

        <Form.Group className="my-2" controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmpassword">
            <Form.Label>password</Form.Label>
            <Form.Control type="password" placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
            <Button type="submit" className="my-3" variant="primary"> Register</Button>
             </Form>
     </FormContainer>
    )
}
export default Signup