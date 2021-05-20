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

router.put('/workouts/:id', (req, res) => {
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
const array = []
router.get('/workouts/range', (req, res) => {
    Workout.find().limit(7).sort({date: -1}).then((data)=>{
        data.sort((x,y) => x.day - y.day);
        data.forEach((id)=>{
            id.exercises.forEach((workout) => {
                array.push(workout.duration)
            })
            const total = array.reduce((x, y)=> x + y);
            Object.assign(id, {totalDuration: total})
        })
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).json(err);
      });
})
module.exports = router;