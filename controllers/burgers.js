const express = require('express');
const router = express.Router();
const Burgers = require('../models/burgers.js');

//This is the read route
router.get('/', (req, res)=> {
  Burgers.find({}, (err, foundBurgers)=>{
    res.json(foundBurgers);
  });
});

//This is the create route
router.post('/', (req,res)=> {
  Burgers.create(req.body, (err, createdBurger)=> {
      res.json(createdBurger);
  });
});


//This is the delete route
router.delete('/:id', (req, res)=> {
  Burgers.findByIdAndRemove(req.params.id, (err, deletedBurger)=>{
     res.json(deletedBurger)
  });
});

//This is the update route
router.put('/:id', (req, res)=> {
  Burgers.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBurger)=> {
    res.json(updatedBurger);
  })
})

module.exports = router;
