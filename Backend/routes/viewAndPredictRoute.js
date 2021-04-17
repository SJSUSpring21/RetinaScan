const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Patient = mongoose.model("Patient");


router.get('/fetchPatientDetails/:patientId', (req, res) => {
    const patientId = req.params.patientId;
    console.log("patientId: " + patientId)
    Patient.aggregate([
        { "$match": { "patientGenId": parseInt(patientId) } },
        {
            "$lookup":
            {
                from: "diagnoses",
                localField: "patientGenId",
                foreignField: "patient_id",
                as: "patientInfo"
            }
        }
    ]).then(result => {
        console.log(result)
        return res.json({ result: result })
    }).catch(err => {
            return res.status(400).json({ error: "Error while fetching all pending delete accounts" });
        })
});

module.exports = router;