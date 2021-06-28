const express = require('express');
const router = express.Router();
const Favourite = require('../models/Favourite');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


router.route('/')
    .get((req, res) => {

        const userId = req.decode.userId;

        Favourite.where({userId: userId})
        .fetchAll()
        .then(userFavourites => {
            
            if(!userFavourites.toJSON()) {
                userFavourites = [];
            }

            res.json(userFavourites);
        })
        .catch(err => {

            res.json([])
        })
        
    })
    .post((req, res) => {

        const userId = req.decode.userId;
        const {idTeam, strTeam, strTeamBadge} = req.body;

        Favourite.where({userId: userId, idTeam: idTeam})
        .fetch()
        .then(_matchingFavourite => {

            return res.status(400).json({message: "The favourite already exists!"})
        })
        .catch(_error => {

            const newFavourite = {
                favouritesId: uuidv4(),
                userId,
                idTeam,
                strTeam,
                strTeamBadge
            }

            new Favourite(newFavourite)
                .save(null, {method: 'insert'})
                .then(newFav => {
                    
                    return res.status(201).json(newFav);
                })
                .catch((error2) => {
                    
                    return res.status(400).json({message: `Couldn't save the new favourite for user id ${userId}`})
                })

        })
    })


    router.route("/:teamId")
        .get((req,res) => {
            const userId = req.decode.userId;
            const teamId = req.params.teamId;

            Favourite.where({userId: userId, idTeam: teamId})
                .fetch()
                .then(_matchingFavourite => {
                    res.status(201).json({partOfFavourites: true});
                })
                .catch(_error => {
                    res.status(201).json({partOfFavourites: false});
                })
        }) 
        .delete((req, res) => {
            const userId = req.decode.userId;
            const teamId = req.params.teamId;

            Favourite.where({idTeam: teamId, userId: userId})
                .destroy()
                .then(() => {
                    res.status(200).json({message: "The team is deleted from the favourites list successfully!"});
                })
                .catch(() => {
                    res.status(400).json({error: "Error trying to delete the favourite! Most likely it already doesn't exist"});
                })
        })

    router.route('/user/:userId')
        .get((req,res) => {
            const userId = req.params.userId;

            Favourite.where({userId: userId})
                .fetchAll()
                .then(userFavourites => {
                    res.status(200).json(userFavourites);
                })
                .catch(error => {
                    res.status(200).json([]);
                })

        })

module.exports = router;