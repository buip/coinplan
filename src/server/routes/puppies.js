const express = require('express');
const Puppies = require('../models/Puppies');

const router = express.Router();

/**
 * Route for getting all puppies
 */
router.get('/', async (req, res) => {
    try {
        const rows = await Puppies.getAll();
        res.json(rows);
        // res.send(200);
    } catch (err) {
        // return next(err);
    }
});

module.exports = router;