import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDataMutation, useUpdateMutation } from '../slices/userApiSlices';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlices';
import { useNavigate } from 'react-router-dom';



const EditProfile = () => {
    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userImage, changeImage] = useState('')
    const { userInfo } = useSelector((state) => state.auth)
    const [update] = useUpdateMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Enter same passwords')
            return
        } else {
            if (password === '' && confirmPassword === '' || password === confirmPassword) {
                const res = await update({
                    _id: userInfo._id,
                    name,
                    email,
                    password,

                }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success('Updated successfully')
            }

        }
        navigate('/profile')


    }
    const [data, { isLoading }] = useDataMutation()
    useEffect(() => {
        setEmail(userInfo.email)
        setName(userInfo.name)
        const user = JSON.parse(localStorage.getItem('userInfo'))

        const userData = async () => {
            try {
                const res = await data({ user }).unwrap()

            } catch (error) {
                console.log('error happend in editpropage', error)
            }

        }
        userData();

    }, [userInfo.name, userInfo.email])

    return (





        <div className="py-5" style={{ background: '#0A0A23' }}>
            <Container className="d-flex justify-content-center">
                <Card className="w-50 flex-column" style={{ height: '900px', color: 'white', background: '#080819' }}>
                    {userImage ? (
                        <>

                            <Card.Img variant="top" src=""
                                className="rounded-circle mx-auto mt-" style={{ width: '150px', height: '150px' }} />
                        </>

                    ) : (
                        <Card.Img variant="top" src="https://media.istockphoto.com/id/1283675387/photo/blue-male-avatar-blank-shape-in-white-hole-3d-illustration.jpg?s=612x612&w=0&k=20&c=a5Nzdfbp_1lx4IKmieJ8ZaTaLTxMxY_UOOfTDOU8gRM="
                            className="rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px' }} />
                    )}

                    <FormContainer >
                        <Form onSubmit={handleSubmit}>
                            <Card.Body className="d-flex flex-column align-items-center mt-3">

                                <Form.Group className='my-2 ' controlId='name'>
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group className='my-2' controlId='email'>
                                    <Form.Label>Email Adress</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group className='my-2' controlId='password'>
                                    <Form.Label>New Password</Form.Label>

                                    <Form.Control
                                        type='password'
                                        placeholder='Enter password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </Form.Control>

                                </Form.Group>
                                <Form.Group className='my-2' controlId='confirmpassword'>
                                    <Form.Label>Confirm new password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Confirm password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>


                                <Button type='submit' variant="primary" className="mt-auto w-50 ">Update</Button>


                            </Card.Body>
                        </Form>
                    </FormContainer>
                </Card>
            </Container>
        </div>
    )
}
// <div>
//     EditProfile
//     <form onSubmit={handleSubmit}>
//         <h1>Update profile</h1>
//         <label htmlFor="">Email</label>
//         <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
//         <label htmlFor="">User Name</label>
//         <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
//         <label htmlFor="">Password</label>
//         <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
//         <button type='submit' >Update</button>
//     </form>
// </div>


export default EditProfile