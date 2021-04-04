const mongoose = require('mongoose');
const OpthalPatientMapSchema = mongoose.Schema({
    patiendId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opthalmologist'
      }
});

module.exports = mongoose.model('OpthalPatientMap', OpthalPatientMapSchema);
