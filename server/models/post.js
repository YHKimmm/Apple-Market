const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    negotiable: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    postNum: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    commentNum: {
        type: Number,
        default: 0
    }
}, { collection: 'posts', timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;