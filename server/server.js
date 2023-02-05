require('dotenv').config()

const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
const app = express();
const PORT = process.env.PORT
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comment', commentRoutes);


mongoose.set("strictQuery", false);

// connect to db
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log('connected to db & listening on port', PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })


