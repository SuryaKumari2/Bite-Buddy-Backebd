const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.post('/add-firm', verifyToken, firmController.addFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/:firmId', firmController.deleteFirm);

module.exports = router;