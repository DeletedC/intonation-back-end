const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

const mongoose = require('mongoose');
const cors = require('cors');


///////////////////////////////////////
// CORS CONFIGURATION
///////////////////////////////////////

// List of urls our API will accept calls from
const whitelist = ['http://localhost:3000']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

///////////////////////////////////////
// DATABASE - MONGOOSE
///////////////////////////////////////

const db = mongoose.connection;
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/intonation';

// On Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true});
mongoose.connection.once('open', () => {
console.log('connected to mongoose...');
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log(err.message + ' is MongoDB not running?');
});

// On Disconnection
mongoose.connection.on('disconnected', () => {
    console.log("Mongo is disconnected.");
});


///////////////////////////////////////
// MODELS
///////////////////////////////////////



///////////////////////////////////////
// CONTROLLERS
///////////////////////////////////////



///////////////////////////////////////
// MIDDLEWARE
///////////////////////////////////////

app.use(cors(corsOptions)) // cors middlewear, configured by corsOptions
app.use(express.json())
app.use(express.static('build'))

///////////////////////////////////////
// ROUTES
///////////////////////////////////////



///////////////////////////////////////
// LISTENING
///////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Port: ${PORT}`); 
    console.log("Hello, Seattle. I'm listening...");
});