const express = require('express');
const router = express.Router();
const regPatientController = require('../controller/registerPatientController');

router.post('/registerPatient', regPatientController.registerPatient);

router.post('/registerDoctor', regPatientController.registerDoctor);

module.exports = router;