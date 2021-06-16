const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require("jsonwebtoken");

jsonSecretKey = "Cemboo";


const readUserData = () => {

    console.log("cem")

    const result = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
    
    return result;
}

router.route('/')
    .post((req, res) => {

        const{userName, password} = req.body;
        
        //finding the user
        const users = readUserData();
        const user = users.find(user => user.userName === userName)

        //checking if password matches
        if(user && user.password === password) {
            res
                .status(200)
                .json({ token: jwt.sign({ userId: user.userId }, jsonSecretKey) });
        }
        else {
            res
                .status(400)
                .json({error: "Invalid password or username!"})
        }

        
        res.json(users)
    })


module.exports = router;