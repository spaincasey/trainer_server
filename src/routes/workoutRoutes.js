const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Workout = mongoose.model('Workout');

const router = express.Router();

router.use(requireAuth);

/********************************************************************
 * NAME: GET workout 
 * DESCRIPTION: Get endpoint to query the database for a random workout
 * for the muscle supplied by the client.
 *******************************************************************/
router.get('/workout', async (req, res) => {
    try {
        const workout = await Workout.aggregate([
            { $match: { mainMuscle: req.query.muscle } },
            { $sample: { size: 1 } }
        ])

        if (workout.length < 1 || workout === undefined) {
            throw 'No data found.';
        } else {
            res.send(workout);
        }
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

/********************************************************************
 * NAME: POST workout
 * DESCRIPTION: Post endpoint add a workout to the database. 
 *******************************************************************/
router.post('/workout', async (req, res) => {
    const { name, image, description, mainMuscle, otherMuscles, steps } = req.body;

    if (!name || !image || !description || !mainMuscle || !otherMuscles || !steps) {
        return res
            .status(422)
            .send({ error: 'You must provide all data' });
    }
    try {
        const workout = new Workout({ name, image, description, mainMuscle, otherMuscles, steps });
        await workout.save();
        res.send(workout);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;