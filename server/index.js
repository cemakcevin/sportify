const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const http = require('http');

const server = http.createServer(app);
const io = socketio(server, {cors: {origin: "*"}});

const loginRoute = require('./routes/loginRoute');
const favouritesRoute = require('./routes/favouritesRoute');
const commentsRoute = require('./routes/commentsRoute');
const usersRoute = require('./routes/usersRoute');
const friendsRoute = require('./routes/friendsRoute');
const requestsRoute = require('./routes/requestsRoute');
const feedRoute = require('./routes/feedRoute');
const { Console } = require('console');

require('dotenv').config();

const {PORT, URL, SECRET} = process.env;

app.use(express.static('public'));

app.use(cors())
app.use(express.json());

//socket connection
io.on('connection', (socket) => {

    socket.on('gameComment', ({videoComments}) => {
        //sending the data to rest of the sockets
        socket.broadcast.emit('gameCommentUpdates', {videoComments})
    })

})


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



app.use('/login', loginRoute);
app.use('/favourites', favouritesRoute);
app.use('/comments', commentsRoute);
app.use('/users', usersRoute);
app.use('/friends', friendsRoute);
app.use('/requests', requestsRoute);
app.use('/feed', feedRoute);


//functions
function getToken(req) {
    return req.headers.authorization.split(" ")[1];
}


server.listen(PORT, () => {
    console.log(`listening to the server ${URL}${PORT}`);
})


