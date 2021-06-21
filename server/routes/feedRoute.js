const { json } = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.route('/')
    .post((req, res) => {
        
        let commentorId = req.decode.userId;
        let {userId, commentText, contentType, 
            idEvent, strEvent, intHomeScore, 
            intAwayScore, strVideo} = req.body;


        if(!commentText) {
            return res.status(400).json({error: "Comment textfiled is empty! Please type in a comment!"})
        }

        if(!userId) {
            userId = commentorId;
        }

        const users = readUsers();
        const commentor = users.find(user => user.userId === commentorId);
        const user = users.find(user => user.userId === userId);


        const feed = readFeed();

        const feedContent = {
            feedId: uuidv4(),
            userId,
            commentorId,
            contentType,
            commentorName: commentor.name + " " + commentor.lastName,
            userName: user.name + " " + user.lastName,
            imgUrl: commentor.imgUrl,
            commentText,
            timestamp: Date.now(),
            idEvent, 
            strEvent, 
            intHomeScore, 
            intAwayScore, 
            strVideo
        }

        feed.unshift(feedContent);
        writeFeed(feed);

        const userFeed = feed.filter(content => content.userId === userId);

        res.status(200).json(userFeed)
        
    })

router.route('/:userId')
    .get((req, res) => {
        let userId = req.params.userId;

        if(userId === 'currentUser') {
            userId = req.decode.userId;
        }
    
        const feed = readFeed();

        const userFeed = feed.filter(content => content.userId === userId);
        
        res.status(200).json(userFeed);
    })

function readUsers() {
    const users = fs.readFileSync('./data/users.json');
    return JSON.parse(users);
}

function readFeed() {
    const feed = fs.readFileSync('./data/feed.json');
    return JSON.parse(feed);
}

function writeFeed(data) {
    const feed = JSON.stringify(data);
    fs.writeFileSync('./data/feed.json', feed);
}


module.exports = router;