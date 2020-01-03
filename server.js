//dependencies
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const session = require('express-session');
require('dotenv').config();

// PORT - This allows the use of Herokus port or my local port depending on the
// environment
const PORT = process.env.PORT

//Database - Connect to db either through heroku or locally
const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI);

//This connects to Mongo and fixes deprication warnings from Mongoose -
//may or may not need them based on version of Mongoose
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true})

//MIDDLEWARE

//This allows you to use public folder for static assets
app.use(express.static('public'));

app.use(express.json());

app.use(session({
  secret:'feedmeseymour',
  resave:false,
  saveUnitialized: false
}))


const burgersController = require('./controllers/burgers.js');
app.use('/burgers', burgersController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

mongoose.connect('mongodb://localhost:27017/meanburger', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');
});

app.listen(PORT, () => console.log('Listening on port:', PORT));

// app.listen(3000, ()=>{
//     console.log('listening...');
// });
