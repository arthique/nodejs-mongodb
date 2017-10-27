const router = require('express').Router();
const mongoose = require('mongoose');
const Contact = require('../model/Contact');

router.route('/').get((req, res) => {
    Contact.find({}, (err, contacts) => {
        if (err) {
            res.status(400).json(err);
        }
        res.json(contacts);
    })
});

module.exports = router;