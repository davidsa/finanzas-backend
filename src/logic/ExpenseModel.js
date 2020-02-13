const moment = require('moment');
const numeral = require('numeral');
const crocks = require('crocks');
const {ExpenseModel} = require('../db/models');

const USER_ID = '5e3c45916a19c9d5932c9df9';

const {Pair, curry, not, isNil} = crocks;

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

const currentMonth = moment().format('MMMM');

const getStartOfMonth = curry((format, date) =>
  moment(date, format)
    .startOf('month')
    .valueOf(),
);

const getEndOfMonth = curry((format, date) =>
  moment(date, format)
    .endOf('month')
    .valueOf(),
);

const startEndObj = curry((start, end) => ({start, end}));

const getStartAndEndOfMonth = monthName =>
  Pair(monthName, monthName)
    .bimap(getStartOfMonth('MMMM'), getEndOfMonth('MMMM'))
    .merge(startEndObj);

const findMonthExpenses = curry((userId, {start, end}) =>
  ExpenseModel.find({
    userId,
    date: {$gte: start, $lt: end},
  }).sort('-date'),
);

module.exports.addExpenses = ExpenseModel.insertMany.bind(ExpenseModel);

module.exports.getMonthExpenses = (userId, monthName = currentMonth) =>
  findMonthExpenses(userId, getStartAndEndOfMonth(monthName));

module.exports.smsListToExpenses = smsList =>
  smsList
    .map(execRegexp(regexp))
    .filter(not(isNil))
    .map(getExpenseModel);
