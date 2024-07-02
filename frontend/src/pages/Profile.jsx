import React, { useEffect, useRef, useState } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateImageMutation} from "../slices/userApiSlices";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { setCredentials } from "../slices/authSlices";




const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth)

    const [userImage, setImage] = useState('')
    const fileInputRef = useRef(null)
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [updateProfile, { isLoad }] = useUpdateImageMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [UpdateImage] = useUpdateImageMutation()
    const [userProfile,setUserProfile]=useState(false)
    const [profile, setProfile] = useState("");
    const image = () => {

        document.getElementById('fileInput').click()
    }
    useEffect(() => {}, [userProfile]);
    useEffect(() => {
        console.log('userInfooo in useEffect',userInfo)
      setName(userInfo.data.name);
      setEmail(userInfo.data.email);
      setProfile(userInfo.data.profileImage);
    }, [userInfo.email, userInfo.name,userInfo.userImage]);

    const handleFileChange = async (e) => {
       
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        console.log(e.target.files[0],'fileedssssss')
        console.log(userInfo._id)
        formData.append('id', userInfo._id) 
        try {

            const res = await UpdateImage(formData)
             dispatch(setCredentials({...res}))
             console.log(res,'Imgggressssssss')
             console.log('resss1',userInfo)
             setUserProfile(!userProfile)


        } catch (error) {
            console.log('error in profile', error)
        }

    }


    return (
        <div className="py-5" style={{ background: '#0A0A23' }}>
            <Container className="d-flex justify-content-center">
                <Card className="w-50 flex-column" style={{ height: '500px', color: 'white', background: '#080819' }}>
                    {userInfo.profileImage ? (
                        <>

                            <Card.Img variant="top" src={`http://localhost:5000/profilepic/${userInfo.profileImage}`}
                                className="rounded-circle mx-auto mt-" style={{ width: '150px', height: '150px' }} onClick={image} />
                        </>

                    ) : (
                        <Card.Img variant="top" src="https://media.istockphoto.com/id/1283675387/photo/blue-male-avatar-blank-shape-in-white-hole-3d-illustration.jpg?s=612x612&w=0&k=20&c=a5Nzdfbp_1lx4IKmieJ8ZaTaLTxMxY_UOOfTDOU8gRM="
                            className="rounded-circle mx-auto mt-3" style={{ width: '150px', height: '150px' }} onClick={image} />
                    )}
                    <input
                        type="file"
                        name="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        hidden
                    />


                    <Card.Body className="d-flex flex-column align-items-center mt-3">



                        <Card.Title className="mt-4 color-black" style={{ color: 'red' }}>User Name :   {userInfo.name} </Card.Title>

                        <Card.Text className="mb-2">

                            Gmail :  {userInfo.email}

                        </Card.Text>
                        <LinkContainer to='/update'>

                            <Button variant="primary" className="mt-auto w-50 ">Edit profile</Button>
                        </LinkContainer>

                    </Card.Body>

                </Card>
            </Container>
        </div>
    )
}
export default Profile