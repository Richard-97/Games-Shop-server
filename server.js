const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const graphql = require('express-graphql');
const schema = require('./schema/schema');

require('dotenv').config();//pristup k .ENV

const app = express();

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded( {extended:true} ));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/graphql' }));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));

app.use(cookieParser());
app.use('/graphql',graphql({
    schema,
    graphiql: true,
}))

const port = process.env.PORT || 4000;
const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});


const io = require('socket.io').listen(server);
const {socketManager} = require('./controllers/socketManager');