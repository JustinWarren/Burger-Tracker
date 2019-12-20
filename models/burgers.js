const mongoose = require('mongoose');

const burgerSchema = new mongoose.Schema({
      name: String,
      location: String,
      notes: String
});

//This will set up the collection
const Burgers = mongoose.model('Burger', burgerSchema);

module.exports = Burgers;
