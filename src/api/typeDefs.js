const {gql} = require('apollo-server');

const typeDefs = gql`
  scalar Date

  type Query {
    users: [User!]!
    expenses: [Expense!]!
  }

  type Mutation {
    addUser(user: UserInput): User
    addExpenses(smsList: [String]): [Expense!]!
  }

  type User {
    _id: ID
    name: String
    lastFetch: Date
  }

  input UserInput {
    name: String
  }

  type Expense {
    _id: String
    place: String
    value: Float
    date: Date
  }
`;

module.exports = typeDefs;
