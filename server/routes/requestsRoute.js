const { json } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();

router.route('/')
    .get((req,res) => {

        const userId = req.decode.userId;
        const requests = readRequests();

        const userRequests = requests.filter(request => request.userId === userId);

        return res.status(201).json(userRequests);

    })
    .post((req, res) => {
        
    })

router.route('/:userId')
    .get((req,res) => {

        const userId = req.params.userId;
        const requests = readRequests();

        const userRequests = requests.filter(request => request.userId === userId);

        return res.status(201).json(userRequests);

    })

function readRequests() {
    const requests = fs.readFileSync('./data/requests.json');
    return JSON.parse(requests);
}



module.exports = router;