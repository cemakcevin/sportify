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

        const requestor = users.find(user => user.userId === requestorId);

        if(!requestor) {
            return res.status(400).json({error: "couldn't find the requestor in the user database!"})
        }

        const requestorName = requestor.name + " " + requestor.lastName;
        const imgUrl = requestor.imgUrl;

        const newRequest = {
            userId,
            requestorId,
            requestorName,
            imgUrl
        }

        requests.push(newRequest);
        writeRequests(requests);

        return res.status(200).json(newRequest);
    })

router.route('/:userId')
    .get((req,res) => {

        const userId = req.params.userId;
        const requests = readRequests();

        const userRequests = requests.filter(request => request.userId === userId);

        return res.status(201).json(userRequests);

    })

router.route('/acceptRequest')
    .post((req, res) => {
        
        const userId = req.decode.userId;
        const {requestorId} = req.body;

        const requests = readRequests();
        const searchedRequest = requests.find(request => request.userId === userId && request.requestorId === requestorId);

        if(!searchedRequest) {
            return res.status(400).json({error: 'Friend request not found!'})
        }

        const filteredRequests = requests.filter(request => {

            if(request.userId === userId && request.requestorId === requestorId){
                return false
            }

            return true;
        })

        writeRequests(filteredRequests);

        const friends = readFriends();
        const users = readUsers();

        const searchedUser = users.find(user => user.userId === userId);

        const friend1 = {
            userId: searchedRequest.requestorId,
            friendId: searchedRequest.userId,
            friendName: searchedUser.name + " " + searchedUser.lastName,
            imgUrl: searchedUser.imgUrl
        }

        const friend2 = {
            userId: searchedRequest.userId,
            friendId: searchedRequest.requestorId,
            friendName: searchedRequest.requestorName,
            imgUrl: searchedRequest.imgUrl
        };

        friends.push(friend1);
        friends.push(friend2);

        writeFriends(friends);

        return res.status(200).json({message: `Both ${friend1.friendName} and ${friend2.friendName} are now friends!`})
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

function readFriends() {
    const friends = fs.readFileSync('./data/friends.json', 'utf-8');
    return JSON.parse(friends);
}

function writeRequests (data) {
    const requests = JSON.stringify(data);
    fs.writeFileSync('./data/requests.json', requests);
}

function writeFriends (data) {
    const friends = JSON.stringify(data);
    fs.writeFileSync('./data/friends.json', friends);
}

module.exports = router;