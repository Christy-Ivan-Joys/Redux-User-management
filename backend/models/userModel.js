import mongoose from  'mongoose'
import bcrypt from  'bcryptjs'

const userModel=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    image:{
        type:String,
        
    },
  isAdmin:{
    type:Boolean,
    default:false
  },
  profileImage:{
    type:String,
default:null,
  }
},{
    timestamps:true
})   

userModel.pre('save',async function(next){
    if(!this.isModified('password')){

        next()

    }

    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
})

userModel.methods.matchPasswords=async function(enteredPassword){

    return await bcrypt.compare(enteredPassword,this.password)

}

export const User = mongoose.model('User',userModel)    
    