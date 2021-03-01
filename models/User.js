const Mongoose = require('mongoose');

require('bob-mongoose-currency').loadType(Mongoose);

module.exports = Mongoose.model('User', new Mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  Age: { type: Number, default: 0 },
  SSN: { type: String, required: true, unique: true },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
