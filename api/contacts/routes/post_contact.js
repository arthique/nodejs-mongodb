const router = require('express').Router();
const mongoose = require('mongoose');
const Contact = require('../model/Contact');

router.route('/').post((req, res) => {
    const contact = new Contact(req.body);

    Contact.count({}, function(err, counter) {
        console.log('Count is ' + counter);
    });
    

    contact.save((err, contacts) => {
        if (err) {
            res.status(400).json(err);
        }
        res.json(contacts.id);
    })
});

module.exports = router;