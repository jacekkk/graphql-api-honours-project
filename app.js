const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();

// disable caching to prevent 304 response
app.disable('etag');

// create a write stream (in append mode)
const logStream = fs.createWriteStream(path.join(__dirname, 'requests.txt'), { flags: 'a' })

// set up the logger
app.use(morgan(':date[clf] :method :url :status :referrer :res[content-length] :response-time', { stream: logStream }));
app.use(bodyParser.json());

app.use('/graphql', cors(), graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}));

mongoose.connect(`mongodb+srv://jacas:w97LPKw77AgP2Usj@cluster0-vvdc2.mongodb.net/honours-project?retryWrites=true`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
