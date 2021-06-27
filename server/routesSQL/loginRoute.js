const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config();

const jsonSecretKey = process.env.SECRET;


const readUserData = () => {

    const result = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
    
    return result;
}

router.route('/')
    .post((req, res) => {

        const{userName, password} = req.body;
        console.log("user name is", userName);
        User.where({userName: userName, password: password})
        .fetch()
        .then(user => {

            const userData = user.toJSON();
           
            res.status(200)
                .json({ token: jwt.sign({ userId: userData.userId }, jsonSecretKey) });
            
        })
        .catch(err => {
            res.status(400)
                .json({error: "Invalid password or username!"})
        })
    })


module.exports = router;