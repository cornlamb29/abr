const fishData = require('./fish-data.json');
const express = require('express');
const cors = require('cors');

const API_KEY = 'abrradiology';
const APP_PORT = 5001;

const app = express();

app.use(cors());

app.get(
    '/gofish',
    (req, res) => {
        // Check for API key.
        if (req.query.apikey === API_KEY) {
            res.send(fishData);
        } else {
            res.status(401).end();
        }
    }
);

app.listen(APP_PORT, () => {
    console.log(`Server started at port ${APP_PORT}`);
});
