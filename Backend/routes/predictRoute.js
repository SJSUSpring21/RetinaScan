const express = require("express");
const app = express()
const router = express.Router()
const predictController = require('../controller/predictController');

  

router.post('/predict/:patientId', predictController.predict);

module.exports = router
