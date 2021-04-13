const mongoose = require('mongoose');
const DiagnosisSchema = mongoose.Schema({
  patientGenId: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  severityScore: {
    type: Number
  },
  diagnosisType: {
    type: String
  },
  comments: {
    type: String
  },
  riscScore: {
    type: Number
  }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);
