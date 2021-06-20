const { json } = require('express');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { route } = require('./friendsRoute');
require('dotenv').config();

router.route('/')
    .get((req,res) => {

        const userId = req.decode.userId;
        const requests = readRequests();

        const userRequests = requests.filter(request => request.userId === userId);

        return res.status(201).json(userRequests);

    })
    .post((req, res) => {
        const requestorId = req.decode.userId;
        const {userId} = req.body;
        
        const requests = readRequests();
        const users = readUsers();

        const requestData = {
            userId,
            requestorId,
        }
    })

router.route('/:userId')
    .get((req,res) => {

        const userId = req.params.userId;
        const requests = readRequests();

        const userRequests = requests.filter(request => request.userId === userId);

        return res.status(201).json(userRequests);

    })

router.route('/isRequestSent/:userId')
    .get((req,res) => {

        const userId = req.params.userId;
        const requestorId = req.decode.userId;

        const requests = readRequests();

        const searchedRequest = requests.find(request => request.userId === userId && request.requestorId == requestorId)

        if(searchedRequest) {
            res.status(201).json({isRequestSent: true});
        }
        else {
            res.status(201).json({isRequestSent: false});
        }

    })

router.route('/isRequestReceived/:requestorId')
    .get((req,res) => {

        const userId = req.decode.userId;
        const requestorId = req.params.requestorId;

        const requests = readRequests();

        const searchedRequest = requests.find(request => request.userId === userId && request.requestorId == requestorId)

        if(searchedRequest) {
            res.status(201).json({isRequestReceived: true});
        }
        else {
            res.status(201).json({isRequestReceived: false});
        }

    })

function readRequests() {
    const requests = fs.readFileSync('./data/requests.json');
    return JSON.parse(requests);
}

function readUsers () {
    const users = fs.readFileSync('./data/users.json', 'utf-8')
    return JSON.parse(users);
}

function writeRequests (data) {
    const requests = JSON.stringify(data);
    fs.writeFileSync('./data/requests.json', requests);
}

module.exports = router;