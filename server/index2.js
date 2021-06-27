const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken");
const http = require('http');

const server = http.createServer(app);
const io = socketio(server, {cors: {origin: "*"}});

const loginRoute = require('./routesSQL/loginRoute');
const favouritesRoute = require('./routesSQL/favouritesRoute');
const commentsRoute = require('./routesSQL/commentsRoute');
const usersRoute = require('./routesSQL/usersRoute');
const friendsRoute = require('./routesSQL/friendsRoute');
const requestsRoute = require('./routesSQL/requestsRoute');
const feedRoute = require('./routesSQL/feedRoute');


require('dotenv').config();

const {PORT, URL, SECRET} = process.env;

app.use(express.static('public'));

app.use(cors());
app.use(express.json());

//socket connection
io.on('connection', (socket) => {

    socket.on('gameComment', ({videoComments}) => {
        //sending the data to rest of the sockets
        socket.broadcast.emit('gameCommentUpdates', {videoComments});
    })

    socket.on('teamComment', ({teamComments}) => {
        //sending the data to rest of the sockets
        socket.broadcast.emit('teamCommentsUpdate', {teamComments});
    })

    socket.on('feedPost', ({feed}) => {
        //sending the data to rest of the sockets
        socket.broadcast.emit('feedPostUpdate', {feed});
    })

    socket.on('feedPostComment', ({feedComments}) => {
        //sending the data to rest of the sockets
        socket.broadcast.emit('feedPostCommentUpdate', {feedComments});
    })

    socket.on("friendRequest", () => {

        socket.broadcast.emit('friendRequestUpdate');
    });

    socket.on("friendAccept", () => {
        
        socket.broadcast.emit('friendAcceptUpdate');
    });

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


