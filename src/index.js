require('dotenv').config();
require('./utils/numeralInit');
const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server');

const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/finanzas';

const log = label => x => console.log(`> ${label}: ${JSON.stringify(x)}`);

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(
  () => console.log('> Database connected successfully!'),
  err => console.log(`> Database error: ${err}`),
);

const typeDefs = require('./api/typeDefs');
const resolvers = require('./api/resolvers');

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => console.log(`> Server listening on ${url}`));
