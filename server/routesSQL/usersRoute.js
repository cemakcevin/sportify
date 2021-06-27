const express = require('express');
const router = express.Router();
const fs = require('fs');
const User = require('../models/User');
require('dotenv').config();

//personal info
router.route('/')
    .get((req, res) => {
        const userId = req.decode.userId;

        User.where({userId: userId})
            .fetch()
            .then(currentUser => {
                return res.status(201).json(currentUser);
            })
            .catch(() => {
                return res.status(400).json({error: "User not found!"});
            })
    })

//friend's info
router.route('/:userId')
    .get((req, res) => {
        const userId = req.params.userId;

        User.where({userId: userId})
            .fetch()
            .then(currentUser => {
                return res.status(201).json(currentUser);
            })
            .catch(() => {
                return res.status(400).json({error: "User not found!"});
            })

    })

module.exports = router;