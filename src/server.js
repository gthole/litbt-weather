const express = require('express');
const request = require('simpleragent');

const app = express();

app.get('/api/v1/location/search', async (req, res) => {
    const resp = await nomatim.get('/search').query(req.query);
    return res.status(resp.statusCode).json(resp.body);
});
