const aws = require('aws-sdk')
const multer = require("multer");
const multerS3 = require('multer-s3')
const path = require("path");
require ('dotenv').config()

const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})
try {
    
    module.exports = multer({
        storage: multerS3({
            s3:s3,
        bucket: "downtomeet-mern",
        metadata: function(req,file ,cb) {
            cb(null,{fieldName: file.fieldname})
        },
        key: function(req,file,cb){
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname)
            cb(null, `${name.replace(/\s/g, "")}-${Date.now()}${ext}`)
        } 
    })
})
} catch (error) {
    console.log("Hello")
}