const Vendor=require('../models/Vendor');
const Firm=require('../models/Firm');
const multer=require('multer');
const path=require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});


const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    console.log('adding')
    try {
        const { firmName, area, region, category, offer } = req.body;
        const image = req.file ? req.file.filename : undefined

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" })
        }
        console.log('Vendor object:', vendor);

        // Check if vendor already has a firm
        if (vendor.firm && vendor.firm._id) {
            return res.status(400).json({ message: "vendor can have only one firm" });
        }

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        })

        const savedFirm = await firm.save();

        // Associate the saved firm with the vendor
        vendor.firm = savedFirm;
        await vendor.save()

        console.log('added')
        return res.status(200).json({ message: 'Firm Added successfully ', firmId: savedFirm._id, vendorFirmName: savedFirm.firmName });

    } catch (error) {
        console.error("Error adding firm:", error);
        return res.status(500).json({ message: "Internal error in adding firm" })
    }
}
const deleteFirm=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const deletedProduct = await Firm.findByIdAndDelete(firmId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" })
        }
        
    } catch (error) {
        return res.status(500).json({message:'Internal error of deleting'})
    }
}


module.exports = {
    addFirm: [upload.single('image'), addFirm],
    deleteFirm
};