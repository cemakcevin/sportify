const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();

router.route('/')
    .get((req, res) => {

        const userId = req.decode.userId;
        const friends = readFriends();


        const userFriends = friends.filter(friend => friend.userId === userId);

        return res.status(201).json(userFriends);
    })

router.route('/:userId')
    .get((req, res) => {

        const userId = req.params.userId;
        const friends = readFriends();

        const userFriends = friends.filter(friend => friend.userId === userId);

        return res.status(201).json(userFriends);
    })

router.route('/isFriend/:friendId')
    .get((req, res) => {
        
        const userId = req.decode.userId;
        const friendId = req.params.friendId;
        const friends = readFriends();

        const searchedFriend = friends.find(friend => friend.userId === userId && friend.friendId === friendId);

        if(searchedFriend){
            return res.status(201).json({isFriend: true});
        }
        else {
            return res.status(201).json({isFriend: false});
        }
        
    })

function readFriends() {
    const friends = fs.readFileSync('./data/friends.json', 'utf-8');
    return JSON.parse(friends);
}

module.exports = router;