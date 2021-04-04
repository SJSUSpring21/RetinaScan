const mongoose = require('mongoose');
const PatientSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required:true
  },
  DOB:{
      type: String,
      required:true
  },
  email:{
    type: String,
    required:true
 },
  diabetesType:{
    type: String,
    required:true
  },
  yearOfDiabetes:{
    type: Number,
    required:true
  },
 age:{
    type: Number,
    required:true
 },
 bloodSugarLevel:{
    type: Number,
    required:true
 },
 cholestrolLevel:{
    type: Number,
    required:true
 },
 isTobaccoUser:{
    type: Boolean,
    required:true
 },
 bloodPressure:{
    type: Number,
    required:true
 },
 patientGenId:{
    type: Number,
    required:true
 }
});

module.exports = mongoose.model('Patient', PatientSchema);
