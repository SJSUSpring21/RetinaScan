const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    type: String,
    required:true
  },
  password: {
      type: String,
      required:true
  }
});

OpthalmologistSchema.pre('save', async function(next) {
  try {
    console.log("inside middleware");
    const salt = await bcrypt.genSalt(10);
    const hashPwd = await bcrypt.hash(this.password, salt);
    this.password = hashPwd;
    next()
  } catch(error) {
    console.log("inside pwd catch")
    next(error)
  }
});

module.exports = mongoose.model('Opthalmologist', OpthalmologistSchema);
