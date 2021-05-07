module.exports = class Service {
  constructor(model) {
    this.Model = model;
  }

  async getAll(query) {
    return this.Model.find(query).select('-_id -__v');
  }

  async getOne(identity) {
    return this.Model.findOne(identity).select('-_id -__v');
  }

  async new(body) {
    await new this.Model(body).save();
  }

  async deleteAll(query) {
    return (await this.Model.deleteMany(query)).deletedCount;
  }

  async deleteOne(identity) {
    return (await this.Model.deleteOne(identity)).deletedCount;
  }

  async replace(filter, replacement) {
    await this.Model.findOneAndReplace(filter, replacement, { upsert: true });
  }

  async update(filter, replacement) {
    return this.Model.findOneAndUpdate(filter, replacement, { new: true }).select('-_id -__v');
  }
};
