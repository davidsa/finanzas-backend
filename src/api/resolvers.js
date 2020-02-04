const mongoose = require('mongoose');

const UserModel = require('../logic/UserModel');
const ExpenseModel = require('../logic/ExpenseModel');

const USER_ID = '5e30a61076fe9021aca30dab';

const resolvers = {
  Date: require('../utils/scalarDate'),
  Query: {
    users(_, args) {
      return UserModel.find();
    },
    expenses() {
      return ExpenseModel.getMonthExpenses(USER_ID);
    },
  },
  Mutation: {
    addUser(_, {user}) {
      return UserModel.create(user);
    },
    addExpenses(_, {smsList}) {
      const expenses = ExpenseModel.smsListToExpenses(smsList);
      console.log(expenses);
      return ExpenseModel.addExpenses(expenses)
        .then(() => UserModel.updateLastFetch(USER_ID))
        .then(() => ExpenseModel.getMonthExpenses(USER_ID));
    },
  },
};

module.exports = resolvers;
