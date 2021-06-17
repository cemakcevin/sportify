const express = require('express');
const fs = require('fs');
const router = express.Router();



router.route('/')
    .post((req, res) => {
        const userId = req.decode.userId;
        const {contentId, contentType, userUrl, commentText} = req.body;
        const contentTypes = ["game", "team"];

        if(!commentText) {
            return res.status(400).json({error: "There is no text written for comments!"})
        }

        if(!contentTypes.includes(contentType)) {
            return res.status(400).json({error: "Invalid content!"})
        }

        const comments = readComments();

        const newComment = {
            contentId, 
            contentType, 
            userId, 
            userUrl, 
            commentText,
            timestamp: Date.now() 
        }

        comments.push(newComment);
        writeComments(comments);

        return res.status(201).json(newComment);

    })




//functions

function readComments() {
    const comments = fs.readFileSync('./data/comments.json', "utf-8");
    return JSON.parse(comments);
}

function writeComments(data) {
    const comments = JSON.stringify(data);
    fs.writeFileSync('./data/comments.json', comments);
}

module.exports = router;