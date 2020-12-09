const mongoose = require('mongoose');

const muscleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    muscles: [muscleSchema]
});

mongoose.model('Category', categorySchema);