const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js');

router.post('/', (req, res) => {
  User.findOne({username:req.body.username}, (error, foundUser) => {
    if(foundUser === null) {
      res.json({
        message: 'user not found!',
      });
    } else {
      const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
      if(doesPasswordMatch){
        res.json(foundUser)
      } else {
        res.json({
          message: 'user not found'
        });
      }
    }
   });
});


module.exports = router;
