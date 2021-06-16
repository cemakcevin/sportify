const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const loginRoute = require('./routes/loginRoute');
const favouritesRoute = require('./routes/favouritesRoute');

require('dotenv').config();

const {PORT, URL, SECRET} = process.env;

app.use(cors())
app.use(express.json());

//checking if the user is authorized
app.use((req, res, next) => {

    if(req.url === "/login") {
        next();
    }
    else {

        const token = getToken(req)

        if(token) {

            if(jwt.verify(token, SECRET)) {
                req.decode = jwt.decode(token);
                next()
            }
            else {
                res.status(403).json({error: "Not authorized!"})
            }
        }
        else {
            res.status(403).json({error: "No token available, unauthorized!"})
        }
    }
})


//functions
function getToken(req) {
    return req.headers.authorization.split(" ")[1];
}

app.use('/login', loginRoute);
app.use('/favourites', favouritesRoute)


app.listen(PORT, () => {
    console.log(`listening to the server ${URL}${PORT}`);
})


