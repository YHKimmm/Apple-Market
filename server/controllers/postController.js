const Post = require('../models/post');
const Counter = require('../models/counter');
const User = require('../models/user');

const uploadItems = async (req, res) => {
    const temp = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        price: req.body.price,
        negotiable: req.body.negotiable,
    };
    await Counter.findOne({ name: 'counter' }).exec().then((counter) => {
        temp.postNum = counter.postNum;
        User.findOne({ uid: req.body.uid })
            .then((user) => {
                console.log('user: ', user);
                temp.author = user._id;
                const post = new Post(temp);
                post.save()
                    .then(() => {
                        Counter.updateOne({ name: 'counter' }, { $inc: { postNum: 1 } })
                            .then(() => {
                                res.status(200).json({ success: true });
                            })
                    })
                    .catch((error) => {
                        res.status(400).json({ success: false });
                        console.log(error);
                    })
            })
    })
}

const getItems = (req, res) => {
    const sort = {};

    if (req.query.sort === "popular") {
        sort.commentNum = -1;
    } else if (req.query.sort === "newest") {
        sort.createdAt = -1;
    } else if (req.query.sort === "cheapest") {
        sort.price = 1;
    } else if (req.query.sort === "expensive") {
        sort.price = -1;
    } else {
        sort.commentNum = -1;
    }

    Post.find()
        .populate('author')
        .sort(sort)
        .exec()
        .then((doc) => {
            res.status(200).json({ success: true, items: doc });
        })
        .catch((error) => {
            res.status(400).json({ success: false });
            console.log(error);
        })
}

const detailItem = (req, res) => {
    Post.findOne({ postNum: req.params.postNum })
        .populate('author')
        .then((doc) => {
            res.status(200).json({ success: true, item: doc });
        })
        .catch((error) => {
            res.status(400).json({ success: false });
            console.log(error);
        })
}

const editItem = (req, res) => {
    const temp = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        price: req.body.price,
        negotiable: req.body.negotiable,
    };
    Post.updateOne({ postNum: req.params.postNum }, { $set: temp })
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((error) => {
            res.status(400).json({ success: false });
            console.log(error);
        })
}

const deleteItem = (req, res) => {
    Post.deleteOne({ postNum: req.params.postNum })
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((error) => {
            res.status(400).json({ success: false });
            console.log(error);
        })
}









module.exports = { getItems, uploadItems, detailItem, editItem, deleteItem };