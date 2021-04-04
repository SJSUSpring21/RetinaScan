const mongoose = require('mongoose');
const DiagnosisSchema = mongoose.Schema({
  patientGenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  imageId: {
    type: String,
    required: true,
  },
  severityScore: {
    type: Number,
    required:true
  },
  diagnosisType:{
      type: String,
      required:true
  },
  comments:{
    type: Number,
    required:true
 },
  riscScore:{
    type: Number,
    required:true
 }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
