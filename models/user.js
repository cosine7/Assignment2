const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, default: 0, required: true },
  ssn: {
    type: String, required: true, unique: true, minLength: 9, maxlength: 9,
  },
  address: { type: String },
  phoneNumber: { type: String, minLength: 10, maxlength: 10 },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
