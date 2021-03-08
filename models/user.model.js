const Mongoose = require('mongoose');

module.exports = Mongoose.model('User', new Mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
    unique: true,
    minLength: 11,
    maxlength: 11,
    validate: {
      validator(value) {
        return /\d{3}-\d{2}-\d{4}/.test(value);
      },
    },
  },
  address: { type: String, required: false },
  phoneNumber: { type: String, required: false },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
