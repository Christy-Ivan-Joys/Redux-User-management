import multer from 'multer';
import path from 'path';

const storage=multer.diskStorage({
    destination:function (req,file,callback){
        callback(null,'backend/assets/profilepic/');
    },
    filename:function(req,file,callback){
       
        callback(null, Date.now() + file.originalname)
    }
})
export const upload = multer({
    storage:storage
})




