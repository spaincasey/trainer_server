const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const Category = mongoose.model('Category');

const router = express.Router();

router.use(requireAuth);

/********************************************************************
 * NAME: GET category
 * DESCRIPTION: Get endpoint that queries the database for all of the 
 * categories and returns them to the client.
 *******************************************************************/
router.get('/category', async (req, res) => {
    try {
        const categories = await Category.find({});
        if (categories.length < 1 || categories === undefined) {
            throw 'No data found.';
        } else {
            res.send(categories);
        }
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

/********************************************************************
 * NAME: POST category
 * DESCRIPTION: Post endpoint to add a new category to the database.
 *******************************************************************/
router.post('/category', async (req, res) => {
    const { name, muscles } = req.body;

    if (!name || !muscles) {
        return res
            .status(422)
            .send({ error: 'You must provide a name and muscles' });
    }
    try {
        const category = new Category({ name, muscles });
        await category.save();
        res.send(category);
    } catch (err) {
        res.status(422).send({ error: err.message });
    }
});

module.exports = router;