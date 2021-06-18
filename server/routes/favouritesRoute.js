const express = require('express');
const router = express.Router();
const fs = require('fs');
require('dotenv').config();


router.route('/')
    .get((req, res) => {

        const userId = req.decode.userId;
        
        const favourites = readFavouritesData();
        let userFavourites = favourites.filter(fav => fav.userId === userId);

        if(!userFavourites) {
            userFavourites = [];
        }
        
        res.json(userFavourites);
        
    })
    .post((req, res) => {

        const userId = req.decode.userId;
        const {idTeam, strTeam, strTeamBadge} = req.body;

        const favourites = readFavouritesData();
        
        const matchingFavourite = favourites.find(fav => fav.userId === userId && fav.idTeam === idTeam)
        const newFavourite = {
            userId,
            idTeam,
            strTeam,
            strTeamBadge
        }

        console.log(matchingFavourite);

        if(!matchingFavourite) {
            
            favourites.push(newFavourite);
            writeFavouritesData(favourites);

            res.status(200).json(newFavourite)
        }
        else{
            res.status(400).json({message: "The favourite already exists!"})
        }
    })


    router.route("/:teamId")
        .get((req,res) => {
            const userId = req.decode.userId;
            const teamId = req.params.teamId;

            const favourites = readFavouritesData();

            const searchedTeam = favourites.find(fav => fav.idTeam === teamId && fav.userId === userId);

            if(searchedTeam) {
                res.status(201).json({partOfFavourites: true});
            }
            else {
                res.status(201).json({partOfFavourites: false});
            }
        }) 
        .delete((req, res) => {
            const userId = req.decode.userId;
            const teamId = req.params.teamId;

            const favourites = readFavouritesData();

            const filteredTeams = favourites.filter(fav => {

                if(fav.idTeam === teamId && fav.userId === userId) {
                    return false;
                }

                return true;
            })

            writeFavouritesData(filteredTeams);

            res.status(200).send("The team is deleted from the favourites list successfully!")
        })

    //functions

    function readFavouritesData() {
    
        const results = fs.readFileSync('./data/favourites.json', 'utf-8');
        return JSON.parse(results);
    }
    
    function writeFavouritesData(data) {
        
        const StringifiedData = JSON.stringify(data);
        fs.writeFileSync('./data/favourites.json', StringifiedData);
    }

module.exports = router;