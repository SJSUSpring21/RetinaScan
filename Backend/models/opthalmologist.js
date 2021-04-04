const mongoose = require('mongoose');
const OpthalmologistSchema = mongoose.Schema({
  docName:{
    type: String,
    required: true,
  },
  userName:{
    type: String,
    required: true,
  },
  email:{
    type: Number,
    required:true
  },
  password: {
      type: Number,
      required:true
  }
});

module.exports = mongoose.model('Opthalmologist', OpthalmologistSchema);
