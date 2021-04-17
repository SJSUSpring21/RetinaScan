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
            return res.status(400).json({ error: "Error while fetching patient and diagnosis information" });
        })
});

router.get('/fetchAllPatientDetails', (req, res) => {
    Patient.aggregate([
        {
            "$lookup":
            {
                from: "diagnoses",
                localField: "patientGenId",
                foreignField: "patient_id",
                as: "allPatientInfo"
            }
        }
    ]).then(result => {
        console.log(result)
        return res.json({ result: result })
    }).catch(err => {
            return res.status(400).json({ error: "Error while fetching all patient and diagnosis information" });
        })
});

router.get('/getHighRiskPatients', async (req, res) => {
    try {
        Patient.aggregate([
            {$match: {
                $or: [
                    {bloodSugarLevel:{$gte:0}},
                    {cholestrolLevel:{$gte:1}},
                    {bloodPressure:{$gte:0}}
                ]
            }}, 
            {$lookup:{
                from: 'diagnoses',
                localField: 'patientGenId',
                foreignField: 'patient_id',
                as: 'diagnostic' 
            }},
            {$match:{
                'diagnostic.0.score': {$eq:0}
            }}
        ])
            .then(result => {
                console.log(result)
                return res.json({ result: result })
            })
            .catch(err => {
                return res.status(400).json({ error: "Error while getting high risk patients" });
            })
    }
    catch (err) {
        return res.status(400).json({ error: err });
    }
});

module.exports = router;