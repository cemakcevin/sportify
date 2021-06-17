const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


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
            commentId: uuidv4(),
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


router.route('/:contentType/:contentId')
    .get((req, res) => {
        const {contentId, contentType} = req.params;
        const comments = readComments();

        const contentComments = comments.filter(comment => {

            if(comment.contentId === contentId && comment.contentType === contentType) {
                return true;
            }

            return false;
        })

        return res.status(201).json(contentComments);

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