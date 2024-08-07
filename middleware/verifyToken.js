const jwt=require('jsonwebtoken');
const Vendor=require('../models/Vendor');
const dotenv=require('dotenv')


dotenv.config();
const secretKey=process.env.WhoIsThis
const verifyToken=async(req,res,next)=>{
    try {
        const token=req.headers.token;
        if(!token)
        {
            return res.status(400).json({message:'token not found'})
        }
        let decode=jwt.verify(token,secretKey);
        let vendor=await Vendor.findById(decode.vendorId)
        if(!vendor)
        {
            return res.status(401).json({message:'vendor not found'})
        }
        req.vendorId = vendor._id;
        next();

        
    } catch (error) {
        return res.status(500).json({message:"Internal error in verifying token"})
    }
}

module.exports=verifyToken