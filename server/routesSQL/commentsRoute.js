const express = require('express');
const fs = require('fs');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.route('/')
    .post((req, res) => {
        const userId = req.decode.userId;
        const {contentId, contentType, commentText, receiverId} = req.body;
        const contentTypes = ["game", "team", "feed"];

        if(!commentText) {
            return res.status(400).json({error: "There is no text written for comments!"})
        }

        if(!contentTypes.includes(contentType)) {
            return res.status(400).json({error: "Invalid content!"})
        }

        const comments = readComments();
        const users = readUsers();

        const user = users.find(user => user.userId === userId)
        const {name, lastName, imgUrl} = user;

        const newComment = {
            commentId: uuidv4(),
            contentId, 
            contentType, 
            userId,
            name: name + " " + lastName,
            imgUrl, 
            commentText,
            timestamp: Date.now(),
            receiverId 
        }

        comments.unshift(newComment);
        writeComments(comments);

        return res.status(201).json(newComment);

    })



router.route('/feedComments/:userId')
    .get((req, res) => {

        let userId = req.params.userId;

        if(userId === "currentUser") {
            userId = req.decode.userId;
        }

        const comments = readComments();
        const userFeedComments = comments.filter(comment => comment.contentType === "feed" && comment.receiverId === userId);

        res.status(201).json(userFeedComments);
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

function readUsers() {
    const users = fs.readFileSync('./data/users.json', "utf-8");
    return JSON.parse(users);
}

function writeComments(data) {
    const comments = JSON.stringify(data);
    fs.writeFileSync('./data/comments.json', comments);
}

module.exports = router;