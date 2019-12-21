const express = require('express');
const mongoose = require('mongoose');
const app = express();


app.use(express.json());
app.use(express.static('public'));


const burgersController = require('./controllers/burgers.js');
app.use('/burgers', burgersController);

mongoose.connect('mongodb://localhost:27017/meanburger', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongoose...');
});


app.listen(3000, ()=>{
    console.log('listening...');
});
