const moment = require('moment');
const numeral = require('numeral');
const crocks = require('crocks');
const {ExpenseModel} = require('../db/models');

const USER_ID = '5e3c45916a19c9d5932c9df9';

const {not, isNil} = crocks;

const regexp = /\$(\d+.*) en (.*) (\d{2}:\d{2}). (\d{2}\/\d{2}\/\d{4})/;

const execRegexp = regexp => value => regexp.exec(value);

const getDate = (date, hour) =>
  moment(`${date} ${hour}`, 'DD/MM/YYYY HH:mm').valueOf();

const getExpenseModel = ([_, value, place, hour, date]) => ({
  userId: USER_ID,
  value: numeral(value).value(),
  date: getDate(date, hour),
  place,
});

const startOfMonth = moment()
  .startOf('month')
  .valueOf();

const endOfMonth = moment()
  .endOf('month')
  .valueOf();

module.exports.addExpenses = ExpenseModel.insertMany.bind(ExpenseModel);

module.exports.getMonthExpenses = userId =>
  ExpenseModel.find({
    userId,
    date: {$gte: startOfMonth, $lt: endOfMonth},
  }).sort('-date');

module.exports.smsListToExpenses = smsList =>
  smsList
    .map(execRegexp(regexp))
    .filter(not(isNil))
    .map(getExpenseModel);
