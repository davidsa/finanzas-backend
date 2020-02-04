const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  lastFetch: {type: Date, default: Date.now()},
});

const ExpenseSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  value: Number,
  place: String,
  date: Date,
});

const UserModel = mongoose.model('User', UserSchema);
const ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports = {
  UserModel,
  ExpenseModel,
};
