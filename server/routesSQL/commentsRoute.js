const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment');
const User = require('../models/User');

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

        User.where({userId: userId})
            .fetch()
            .then(user => {
                const {name, lastName, imgUrl} = user.toJSON();

                const comment = {
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

                return new Comment(comment).save(null, {method: 'insert'});
            })
            .then(newComment => {
                return res.status(201).json(newComment);
            })

    })



router.route('/feedComments/:userId')
    .get((req, res) => {

        let userId = req.params.userId;

        if(userId === "currentUser") {
            userId = req.decode.userId;
        }

        Comment.where({contentType: "feed", receiverId: userId})
            .fetchAll()
            .then(userFeedComments => {
                res.status(201).json(userFeedComments);
            })

    })


router.route('/:contentType/:contentId')
    .get((req, res) => {
        const {contentId, contentType} = req.params;
        console.log()

        Comment.where({contentId: contentId, contentType: contentType})
            .fetchAll()
            .then(contentComments => {
                return res.status(201).json(contentComments);
            })

    })







module.exports = router;