const mongoose = require('mongoose');
const Patient = mongoose.model("Patient");
const Opthalmologist = mongoose.model("Opthalmologist");
const Diagnosis = mongoose.model("Diagnosis");

class RegisterPatientController {

    static async registerPatient(req, res) {
        try {
            const { patientName, gender, DOB, email, diabetesType, yearOfDiabetes, age, bloodSugarLevel, cholestrolLevel, isTobaccoUser, systolicbloodPressure, diastolicbloodPressure} = req.body

            console.log(req.body)
            Patient.findOne({ email: email }, function (err, obj) {
                if (obj) {
                    res.status(400).send("Patient already exists with this emailId");
                } else {
                    function formatDate(date) {
                        var d = new Date(date),
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();
                     
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
                     
                        return [year, month, day].join('-');
                     }

                    const d = formatDate(DOB)
                    const patientGenId = Math.random().toString().substr(2, 6)
                    const patient = new Patient({
                        patientName,
                        gender,
                        DOB:d,
                        email,
                        diabetesType,
                        yearOfDiabetes,
                        age,
                        bloodSugarLevel,
                        cholestrolLevel,
                        isTobaccoUser,
                        systolicbloodPressure,
                        diastolicbloodPressure,
                        patientGenId
                    })
                    patient.save()
                        .then(result => {
                            const diagnosisDtls = new Diagnosis({
                                patient_id: patientGenId
                            })

                            diagnosisDtls.save()
                                .then(result => {
                                    res.status(200).send("Patient registered successfully with patientId: " + patientGenId)
                                })
                                .catch(err => {
                                    res.status(400).send("Error while saving the patient related diagnosis object");
                                })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).send("Error while saving the patient object");
                        })
                }
            });
        }
        catch (error) {
            console.log(error)
            return res.status(400).send("Error while registering patient");
        }
    }

    static async registerDoctor(req, res) {
        try {
            const { docName, userName, email, password } = req.body

            Opthalmologist.findOne({ userName: userName }, function (err, obj) {
                if (obj) {
                    res.status(400).send("Doctor already exists with this username");
                } else {
                    const doctor = new Opthalmologist({
                        docName,
                        userName,
                        email,
                        password
                    })
                    doctor.save()
                        .then(result => {
                            res.status(200).send("Doctor registered successfully with username: " + userName)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).send("Error while saving the opthalmologist");
                        })
                }
            });
        }
        catch (error) {
            console.log(error)
            return res.status(400).send("Error while registering doctor");
        }
    }
}

module.exports = RegisterPatientController
