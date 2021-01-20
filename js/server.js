const express = require('express');
const cors = require('cors');
const axios = require('axios').default;

const app = express();

app.use(cors());

app.get('/', async (req, res) => {

    const { data } = await axios.get('https://api.hgbrasil.com/weather');

    return res.json(data.results);
});

app.get('/selectregion', async (req, res) => {

    const { data } = await axios.get('https://api.hgbrasil.com/weather?woeid='+req.query.id);

    return res.json(data.results);
});

app.listen('4567');