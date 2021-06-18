const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();

router.route('/')
    .get((res, req) => {

        const userId = req.decode.userId;
        const friends = readFriends();

        const userFriends = friends.filter(friend => friend.userId === userId);

        return res.status(201).json(userFriends);
    })


function readFriends() {
    const friends = fs.readFileSync('./data/friends.json', 'utf-8');
    return JSON.parse(friends);
}

module.exports = router;