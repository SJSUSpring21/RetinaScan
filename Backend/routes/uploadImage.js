const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
const Diagnosis = mongoose.model("Diagnosis");

const s3 = new aws.S3({
  accessKeyId: '',
  secretAccessKey: '',
  Bucket: ''
});

router.post('/retinaImageUpload/:patientId', (req, res) => {
  const patientId = req.params.patientId;
  console.log("Patient Id"+req.params.patientId)
  retinaImg(req, res, (error) => {
    if (error) {
      console.log('Error on image upload', error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        res.json('No File Selected');
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        console.log("imageName" + imageName);
        console.log("imageLocation" + imageLocation);
        if (isEmpty(imageName) || isEmpty(imageLocation)) {
          res.status(400).send("Image data doesn't exist");
        } else {
          const filter = { "patient_id": patientId };
          const options = { upsert: true };
          const updateDoc = {
            "$set": { 
              "imageUrl": imageLocation
            }
          };
          Diagnosis.findOneAndUpdate(filter, updateDoc, options, function (err, doc) {
            if (err) res.send(500, { error: err });
            //res.send('Succesfully saved retina image ' + imageLocation);
            res.status(200).json({"imageLocation": imageLocation})
          });
        }
      }
    }
  });
});

const retinaImg = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'retinascans3bucket',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
  }),
  limits: { fileSize: 2000000 }, // 2 MB
  fileFilter: function (req, file, cb) {
    console.log(file.originalname)
    validateFileType(file, cb);
  }
}).single('retinaImage');

function validateFileType(file, cb) {
  const allowedFileType = /jpeg|jpg|png|gif/;
  const mimeType = allowedFileType.test(file.mimetype);
  const extname = allowedFileType.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

function isEmpty(value) {
  return (value === undefined || value == null || value.length <= 0) ? true : false;
}

module.exports = router;
