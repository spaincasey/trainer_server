const mongoose = require('mongoose');

const muscleSchema = new mongoose.Schema({
    name: String
});

const stepSchema = new mongoose.Schema({
    number: Number,
    stepText: String
});

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainMuscle: {
        type: String,
        required: true
    },
    otherMuscles: [muscleSchema],
    steps: [stepSchema]
});

mongoose.model('Workout', workoutSchema);