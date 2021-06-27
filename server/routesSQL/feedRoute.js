const { json } = require('express');
const express = require('express');
const router = express.Router();

const Feed = require('../models/Feed');
const User = require('../models/User');

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
        let commentorData;
        let userData;

        User.where({userId: commentorId})
            .fetch()
            .then(commentor => {
                
                commentorData = commentor.toJSON();

                return User.where({userId: userId}).fetch();
            })
            .then(user => {
                
                userData = user.toJSON();

                const feedContent = {
                    feedId: uuidv4(),
                    userId,
                    commentorId,
                    contentType,
                    commentorName: commentorData.name + " " + commentorData.lastName,
                    userName: userData.name + " " + userData.lastName,
                    imgUrl: commentorData.imgUrl,
                    commentText,
                    timestamp: Date.now(),
                    idEvent, 
                    strEvent, 
                    intHomeScore, 
                    intAwayScore, 
                    strVideo
                }

                console.log(feedContent)

                return new Feed(feedContent).save(null, {method: 'insert'});
            })
            .then(() => {
                
                Feed.where({userId: userId})
                    .fetchAll()
                    .then(userFeed => {
                        res.status(200).json(userFeed)
                    })
            })
            .catch(error => {
                console.log(error);
            })
    })

router.route('/:userId')
    .get((req, res) => {
        let userId = req.params.userId;

        if(userId === 'currentUser') {
            userId = req.decode.userId;
        }

        Feed.where({userId: userId})
            .fetchAll()
            .then(userFeed => {
                res.status(200).json(userFeed);
            })
    })

module.exports = router;