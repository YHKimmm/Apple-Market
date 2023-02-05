const multer = require("multer");
const fs = require('fs');

// get image
const getImage = (req, res) => {
    const imagePath = req.query.imagePath;

    if (!imagePath) {
        res.send("")
        return
    }
    const readStream = fs.createReadStream(imagePath)
    readStream.pipe(res)

};

// image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("file");


const imageUpload = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ success: false });
            console.log(err);
        } else {
            res.status(200).json({ success: true, filePath: res.req.file.path });
            console.log('image upload', res.req.file);

        }
    });
};

module.exports = { getImage, imageUpload };