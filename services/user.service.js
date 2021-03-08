const User = require('../models/user.model');

exports.getUsers = async (request) => User.find(request.query).select('-_id -__v');

exports.getUser = async (request) => User.findOne({ ssn: request.params.ssn }).select('-_id -__v');

exports.newUser = async (request) => {
  await new User(request.body).save();
};

exports.deleteUsers = async (request) => ((await User
  .deleteMany(request.query)).deletedCount > 0 ? 200 : 404);

exports.deleteUser = async (request) => ((await User.deleteOne({
  ssn: request.params.ssn,
})).deletedCount > 0 ? 200 : 404);

exports.replace = async (request) => {
  const { ssn } = request.params;
  const user = request.body;
  user.ssn = ssn;
  await User.findOneAndReplace({ ssn }, user, {
    upsert: true,
  });
};

exports.update = async (request) => {
  const { ssn } = request.params;
  const user = request.body;
  delete user.ssn;
  return User
    .findOneAndUpdate({ ssn }, user, {
      new: true,
    })
    .select('-_id -__v');
};
