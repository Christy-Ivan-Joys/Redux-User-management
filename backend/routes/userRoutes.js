import express from 'express'
const router = express.Router()
import { upload } from '../utils/multer.js'


import {
    userAuth, getUserProfile, UpdateUserProfile, LogoutUser, RegisterUser,
    UploadProPic, getUserData, adminLogin,
    getUsersList,deleteUser,editUser,updateImage
} from '../controllers/userController.js'

router.post('/', RegisterUser)
router.post('/auth', userAuth)
router.route('profile').get(getUserProfile).put(UpdateUserProfile)
router.post('/logout', LogoutUser)
router.post('/Register', RegisterUser)
router.post('/upload', UploadProPic)
router.post('/userData', getUserData)
router.post('/updateProfile', UpdateUserProfile)
router.post('/admin', adminLogin)
router.get('/UsersList',getUsersList)
router.post('/deleteUser',deleteUser)
router.post('/editUser',editUser)
router.post('/updateImage',upload.single("file"),updateImage)

export default router