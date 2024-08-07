const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const vendorRoutes=require('./routes/vendorRoutes')
const firmRoutes =require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')
const cors=require('cors');
const path=require('path');
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Database connected Succesfully'))
.catch((error)=>console.log(error));
const app=express();
const port=process.env.PORT || 4000;

app.use(cors());
app.use(bodyparser.json());
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes)

app.use('/uploads', express.static('uploads'));

app.listen(port,()=>{
    console.group('server running on the port 4000')
})
app.use('/',(req,res)=>{
    res.send('<h1>Welcome to BiteBuddy')
})