const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');


dotenv.config();
const secretKey=process.env.WhoIsThis
const vendorRegister=async(req,res)=>{
    try{
        const{userName,email,password}=req.body;
        const vendor=await Vendor.findOne({email});
        if(vendor)
        {
            return res.status(401).json({message:'email taken'})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newVendor=new Vendor({
            userName,
            email,
            password:hashedPassword
        })
         
        await newVendor.save();
        res.status(200).json({message:"Registeration Successful"})

    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({message:'Internal error of registeration'})
    }
}

const vendorLogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password)))
        {
            return res.status(401).json({message:'Invalid Credentials'})
        }
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        const vendorId=vendor._id;
        res.status(200).json({ success: "Login successful", token, vendorId })
        console.log(email);
        
    } catch (error) {
        return res.status(500).json({message:"Internal error of Login"})
    }
}

const getAllVendors=async(req,res)=>{
    try {
        const allVendors=await Vendor.find().populate('firm');
        res.json({allVendors})
        
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
}

const getVendorById=async(req,res)=>{
    try {
        const getVendorId=req.params.id;
        const vendor=await Vendor.findById(getVendorId).populate('firm');
        if(!vendor){
            return res.status(402).json({message:"vendor not found"})
        }
        const vendorFirmId=vendor.firm[0]._id
        res.status(200).json({ getVendorId, vendorFirmId, vendor })
        console.log(vendorFirmId);
        
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}