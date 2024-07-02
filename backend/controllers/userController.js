import asyncHandler from 'express-async-handler'
import { User } from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import { protect } from '../middleware/authMiddleware.js'
import mongoose from 'mongoose'

import { upload } from '../utils/multer.js'

const userAuth = asyncHandler(async (req, res) => {
console.log(req.body)
    // login /auth   url:`${USERS_URL}/auth`  const USERS_URL='api/users'
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
   console.log(user)
    if (user && (await user.matchPasswords(password))) {
        const token = generateToken(res, user._id)
        console.log(token)
        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            profileImage:user.profileImage,
            token,
        })
        console.log('end request')

    }

})


const RegisterUser = asyncHandler(async (req, res) => {


    const { name, email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        throw new Error('User already exist')

    }

    const user = await User.create({
        name,
        email,
        password
    })


    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            
            _id: user._id,
            name: user.name,
            email: user.email
        })

    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    console.log('register user')
})



const LogoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'user logged out' })
})

const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'update user profile' })
})
const UpdateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password !== '') {
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImage:user.profileImage
        })
    } else {

        throw new Error('user not found')

    }

})

const UploadProPic = asyncHandler(async (req, res) => {
    try {
        
    } catch (error) {

    }
})
const getUserData = asyncHandler(async (req, res) => {
    try {
        const userData = req.body.user
        const userId = userData._id
        const user = await User.findById(userId)
        console.log(user)

        res.status(200).json({ user })


    } catch (error) {
        console.log('error happend in userController', error)
    }

})

const adminLogin = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const admin = await User.findOne({ email: req.body.email, isAdmin: true })
        console.log(admin)
        if (admin && (await admin.matchPasswords(req.body.password))) {
            const token = generateToken(res, admin._id)
            res.json({ admin })
        }
       
    } catch (error) {
        console.log('error happend in adminLogin', error)
    }     
})
const getUsersList=asyncHandler(async(req,res)=>{
    console.log('requerest recieved')
    const userData=await User.find({isAdmin:false})
    console.log(userData)
    Object.freeze(userData)
    console.log('freeeze')
    res.status(200).json({data:userData})
})
const deleteUser=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const userId=req.body.id 
    console.log(userId)
    const deleted= await User.findOne({_id:userId}).then((data)=>{
      res.status(200).json({data})
        
    })
    
   
})    
const editUser=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const update=await User.findByIdAndUpdate(req.body._id,{
        name:req.body.name,
        email:req.body.email,
        
    }).then((data)=>{
        res.status(200).json({
           _id:data._id,
           name:data.name,
           email:data.email 
        })
    })
})


const updateImage=asyncHandler(async(req,res)=>{

    console.log(req.file)
    const updateImg=await User.findByIdAndUpdate(req.body.id,{
        profileImage:req.file.filename
    }).then((data)=>{

        res.status(200).json({
            _id:data._id,
            name:data.name,
            email:data.email,
            profileImage:req.file.filename

        })
    })
   console.log(updateImage)
   
})


   
export {
    userAuth,
    RegisterUser,
    LogoutUser,
    getUserProfile,
    UpdateUserProfile,
    UploadProPic,
    getUserData,
    adminLogin,
    getUsersList,
    deleteUser,
    editUser,
    updateImage
}