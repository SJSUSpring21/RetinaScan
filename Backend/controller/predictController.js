const mongoose = require('mongoose');
const Diagnosis = mongoose.model("Diagnosis");
const axios = require('axios');


exports.predict = (req, res) => {
    // Validate Request
    if(!req.params.patientId) {
      return res.status(400).send({
      message: "Please specify a patient id"
    });
    }

    const patientId = req.params.patientId;
    console.log(
      "============================In of the rest request predict =====================" +
      "Predicting for patient " + patientId
      );

    Diagnosis.findOne({ "patient_id": parseInt(patientId)})
    .then(result => { 
        link = result["imageUrl"]
        console.log("Image URL : " + link)
        axios.post('http://127.0.0.1:5000/predict', {
            data: link
        })
        .then( response => {
            console.log(
                "*********************************  Response  Start   *********************"
            )
            console.log(response.data)
            console.log(
                "*********************************  Response  End    *********************"
            )
            Diagnosis.findOneAndUpdate({ "patient_id": parseInt(patientId)}, { severityScore: response.data})
            .then( result =>{
                return res.status(200).send({
                    "score":response.data
                })
            })
            .catch( err => {
                return res.status(400).send({
                    error: "Error while updating severityScore to database."
                })
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({ error: "Error while fetching from database." });
        })
    })
    .catch(err => {
        return res.status(400).json({ error: "Error while fetching from database." });
    });
}

