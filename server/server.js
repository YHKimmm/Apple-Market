require('dotenv').config()

const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');
// const cors = require('cors')

const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: ['http://localhost:5173',
//         "https://apple-market.onrender.com"]
// }))

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/comment', commentRoutes);


const _dirname = path.resolve()


app.use(express.static(path.join(_dirname, '/client/dist')));
app.get('*', (req, res) =>
    res.sendFile(path.join(_dirname, '/client/dist/index.html'))
);

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


