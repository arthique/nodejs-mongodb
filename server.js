'use strict';

const path    = require("path");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const mongodbUri = 'mongodb://localhost:27017/contacts';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {
    useMongoClient: true
};

const serverConfig = require('./config').server;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/api/contacts', require('./api/contacts/routes/get_contacts'));
app.use('/api/contacts', require('./api/contacts/routes/post_contact'));
// app.get('/api/contacts', require('./api/contacts/routes/get_contact'));
// app.get('/api/contacts', require('./api/contacts/routes/put_contact'));
// app.get('/api/contacts', require('./api/contacts/routes/delete_contact'));

app.listen(serverConfig.port, serverConfig.hostname, () => {
    mongoose.connect(mongodbUri, dbOptions, (err) => {
        if(err) console.log(err);
    });
    console.log(`Server is running at http://${serverConfig.hostname}:${serverConfig.port}`);
});

