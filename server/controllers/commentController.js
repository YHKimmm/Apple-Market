const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

const postComment = (req, res) => {
    const temp = {
        comment: req.body.comment,
        postId: req.body.postId,
    }
    User.findOne({ uid: req.body.uid })
        .then((user) => {
            temp.author = user._id;
            const newComment = new Comment(temp);
            newComment.save(() => {
                Post.findOneAndUpdate(
                    {
                        _id: req.body.postId
                    },
                    {
                        $inc: { commentNum: 1 }
                    })
                    .then(() => {
                        Comment.find({ postId: req.body.postId })
                            .populate("author")
                            .sort({ createdAt: -1 })
                            .exec()
                            .then(() => {
                                res.status(200).json({
                                    success: true,
                                    comment: newComment,
                                    author: user
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                return res.status(400).json({ success: false });
                            });
                    })
            })
        })
        .catch((err) => {
            res.status(400).json({ success: false });
            console.log(err);
        })
};


const getComments = (req, res) => {

    Comment.find({ postId: req.body.postId })
        .populate("author")
        .sort({ createdAt: -1 })
        .then((comments) => {
            return res.status(200).json({ success: true, commentList: comments });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ success: false });
        });

};

const editComment = (req, res) => {
    const temp = {
        postId: req.body.postId,
        comment: req.body.comment,
        uid: req.body.uid
    }
    // console.log('edit temp', temp);
    Comment.findOneAndUpdate({ _id: req.body.commentId }, { ...temp })
        .then((doc) => {
            res.status(200).json({ success: true });
            console.log('edit doc', doc);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
};

const deleteComment = (req, res) => {
    Comment.findOneAndDelete({ _id: req.body.commentId })
        .then(() => {
            Post.findOneAndUpdate(
                {
                    _id: req.body.postId
                },
                {
                    $inc: { commentNum: -1 }
                })
                .then(() => {
                    res.status(200).json({ success: true });
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
}






module.exports = { postComment, getComments, editComment, deleteComment };