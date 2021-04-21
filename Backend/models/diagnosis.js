const mongoose = require('mongoose');
const DiagnosisSchema = mongoose.Schema({
  patient_id: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
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
