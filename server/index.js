const express = require('express');
const cors = require('cors');
const app = express();
const loginRoute = require('./routes/loginRoute');

const PORT = 8686;
const BACKEND_URL = "http://localhost:";


app.use(cors())
app.use(express.json());


app.use('/login', loginRoute);



app.listen(PORT, () => {
    console.log(`listening to the server ${BACKEND_URL}${PORT}`);
})