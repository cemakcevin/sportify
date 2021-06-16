const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require("jsonwebtoken");
require('dotenv').config();




router.route('/')
    .get((req, res) => {
            
    })
    .post((req, res) => {
        console.log(req.decode)

        const {idTeam, strTeam, strTeamBadge} = req.body;
        const userId = req.decode.userId;

        const favourites = readFavouritesData();
        
        const matchingFavourite = favourites.find(fav => fav.userId === userId && fav.idTeam === idTeam)
        const newFavourite = {
            userId,
            idTeam,
            strTeam,
            strTeamBadge
        }

        if(!matchingFavourite) {
            
            favourites.push(newFavourite);
            writeFavouritesData(favourites);

            res.status(200).json(newFavourite)
        }
        else{
            res.status(400).json({message: "The favourite already exists!"})
        }
    })
    .delete((req, res) => {

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