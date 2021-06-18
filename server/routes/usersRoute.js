const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();


router.route('/')
    .get((req, res) => {
        const userId = req.decode.userId;
        const users = readUsers();

        const currentUser = users.find(user => user.userId === userId);

        if(!currentUser) {
            return res.status(400).json({error: "User not found!"});
        }

        return res.status(201).json(currentUser);
    })

router.route('/:userId')
    .get((req, res) => {
        const userId = req.params.userId;
        const users = readUsers();

        const currentUser = users.find(user => user.userId === userId);

        if(!currentUser) {
            return res.status(400).json({error: "User not found!"});
        }

        return res.status(201).json(currentUser);

    })

function readUsers() {
    const users = fs.readFileSync('./data/users.json', 'utf-8');
    return JSON.parse(users);
}

module.exports = router;