const router = require('express').Router();
const Workout = require('../models/Workout.js');

router.get('/workouts', (req, res) => {
    Workout.find({}).sort({ date: -1 })
    .then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    })
});

router.post('/workouts', ({body}, res) => {
    Workout.create(body).then(data =>{
        res.json(data);
    }).catch(err => {
        res.status(400).json(err);
      });
})

router.put('workouts/:id', (req, res) => {
    Workout.findOneAndUpdate(
        { _id: req.params.id },
    { $push: { exercises: req.body } },
    { new: true }
    ).then((data)=> {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})

module.exports = router;