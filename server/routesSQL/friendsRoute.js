const express = require('express');
const router = express.Router();
const fs = require('fs');
const Friend = require('../models/Friend');
require('dotenv').config();

router.route('/')
    .get((req, res) => {

        const userId = req.decode.userId;

        Friend.where({userId: userId})
            .fetchAll()
            .then(userFriends => {
                return res.status(200).json(userFriends);
            })
    })

router.route('/:userId')
    .get((req, res) => {

        const userId = req.params.userId;

        Friend.where({userId: userId})
        .fetchAll()
        .then(userFriends => {
            return res.status(200).json(userFriends);
        })
    })

router.route('/isFriend/:friendId')
    .get((req, res) => {
        
        const userId = req.decode.userId;
        const friendId = req.params.friendId;

        Friend.where({userId: userId, friendId: friendId})
            .fetch()
            .then(() => {
                return res.status(201).json({isFriend: true});
            })
            .catch(() => {
                return res.status(201).json({isFriend: false});
            })
    })

module.exports = router;