const {UserModel} = require('../db/models.js');

module.exports.find = UserModel.find.bind(UserModel);

module.exports.create = UserModel.create.bind(UserModel);

module.exports.updateLastFetch = id =>
  UserModel.updateOne({_id: id}, {lastFetch: Date.now()});
