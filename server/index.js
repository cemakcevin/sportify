const express = require('express');
const cors = require('cors');
const app = express();
const loginRoute = require('./routes/loginRoute');
require('dotenv').config();

const {PORT, URL} = process.env;

app.use(cors())
app.use(express.json());


app.use('/login', loginRoute);



app.listen(PORT, () => {
    console.log(`listening to the server ${URL}${PORT}`);
})