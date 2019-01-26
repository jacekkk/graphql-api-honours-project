const express = require('express');
const { ApolloEngine } = require("apollo-engine");
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');


const server = new ApolloServer({
    graphQLSchema,
    graphQLResolvers,
    tracing: true,
    cacheControl: true,
    engine: false
  });

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}));

server.applyMiddleware({ app });

const engine = new ApolloEngine({
    apiKey: "service:jacas-6348:ju8vT9lCxKhvC8gQ98LPwg"
});

mongoose.connect(`mongodb+srv://jacas:w97LPKw77AgP2Usj@cluster0-vvdc2.mongodb.net/honours-project?retryWrites=true`
).then(() => {
    // app.listen(3000);
    engine.listen({
        port: 3000,
        expressApp: app
    });
}).catch(err => {
    console.log(err);
});
