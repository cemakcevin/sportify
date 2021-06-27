const express = require('express');
const router = express.Router();
const fs = require('fs');
const Request = require('../models/Request');
const User = require('../models/User');
const Friend = require('../models/Friend');
const {v4 : uuidv4} = require('uuid');
require('dotenv').config();

router.route('/')
    .get((req,res) => {

        const userId = req.decode.userId;

        Request.where({userId: userId})
            .fetchAll()
            .then(userRequests => {
                return res.status(201).json(userRequests);
            })

    })
    .post((req, res) => {
        const requestorId = req.decode.userId;
        const {userId} = req.body;

        User.where({userId: requestorId})
            .fetch()
            .then(requestor => {

                const requestorData = requestor.toJSON();
                
                const requestorName = requestorData.name + " " + requestorData.lastName;
                const imgUrl = requestorData.imgUrl;

                const newRequest = {
                    requestId: uuidv4(),
                    userId,
                    requestorId,
                    requestorName,
                    imgUrl
                }

                new Request(newRequest)
                    .save(null, {method: 'insert'})
                    .then(newReq => {
                        return res.status(200).json(newReq); 
                    })
                    .catch(() => {
                        return res.status(400).json({error: "problem inserting the request"})
                    })

            })
            .catch(() => {
                return res.status(400).json({error: "couldn't find the requestor in the user database!"})
            })
        
    })

router.route('/:userId')
    .get((req,res) => {

        const userId = req.params.userId;

        Request.where({userId: userId})
            .fetchAll()
            .then(userRequests => {
                return res.status(201).json(userRequests);
            })

    })

router.route('/acceptRequest')
    .post((req, res) => {
        
        const userId = req.decode.userId;
        const {requestorId} = req.body;

        let searchedRequestData;

        Request.where({userId: userId, requestorId: requestorId})
            .fetch()
            .then(searchedRequest => {
                
                searchedRequestData = searchedRequest.toJSON();
                
                return Request.where({userId: userId, requestorId: requestorId}).destroy()
            })
            .then(() => {

                let friend1;
                let friend2 = {
                    friendshipId: uuidv4(),
                    userId: searchedRequestData.userId,
                    friendId: searchedRequestData.requestorId,
                    friendName: searchedRequestData.requestorName,
                    imgUrl: searchedRequestData.imgUrl
                }
                console.log(friend2)

                User.where({userId: userId})
                    .fetch()
                    .then(searchedUser => {

                        const searchedUserData = searchedUser.toJSON();

                        friend1 = {
                            friendshipId: uuidv4(),
                            userId: searchedRequestData.requestorId,
                            friendId: searchedRequestData.userId,
                            friendName: searchedUserData.name + " " + searchedUserData.lastName,
                            imgUrl: searchedUserData.imgUrl
                        }
                        console.log(friend1)

                        return new Friend(friend1).save(null, {method: 'insert'});
                    })
                    .then(() => {
                        return new Friend(friend2).save(null, {method: 'insert'});
                    })
                    .then(() => {
                        return res.status(200).json({message: `Both ${friend1.friendName} and ${friend2.friendName} are now friends!`});
                    })
                    .catch(error => {
                        console.log(error);
                    })

                
            })
            .catch(() => {
                return res.status(400).json({error: 'Friend request not found!'})
            })
        
    })

router.route('/isRequestSent/:userId')
    .get((req,res) => {

        const userId = req.params.userId;
        const requestorId = req.decode.userId;

        Request.where({userId: userId, requestorId: requestorId})
            .fetch()
            .then(_searchedRequest => {
                res.status(201).json({isRequestSent: true});
            })
            .catch(_error => {
                res.status(201).json({isRequestSent: false});
            })

    })

router.route('/isRequestReceived/:requestorId')
    .get((req,res) => {

        const userId = req.decode.userId;
        const requestorId = req.params.requestorId;

        Request.where({userId: userId, requestorId: requestorId})
            .fetch()
            .then(_searchedRequest => {
                res.status(201).json({isRequestSent: true});
            })
            .catch(_error => {
                res.status(201).json({isRequestSent: false});
            })

    })

module.exports = router;