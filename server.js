const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const cors = require('cors');

const app = express();
app.use(cors({
    "origin" : "*"
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api',route)

app.listen(process.env.PORT,()=>{
    console.log('Server starts on port 4000...');
})

