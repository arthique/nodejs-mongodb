const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    website: {type: String, required: true},
    id: { type: Number, default: 0 }
});

module.exports = mongoose.model('Contact', ContactSchema);