const User = require("../models/user");
const Counter = require("../models/counter");

const userRegister = (req, res) => {
    const temp = {
        displayName: req.body.displayName,
        email: req.body.email,
        uid: req.body.uid,
        photoURL: req.body.photoURL
    };
    Counter.findOne({ name: 'counter' }).then((counter) => {
        temp.userNum = counter.userNum;

        const user = new User(temp);
        user.save()
            .then(() => {
                Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } })
                    .then(() => {
                        res.status(200).json({ success: true });
                    })
            })
            .catch((error) => {
                res.status(400).json({ success: false });
                console.log(error);
            })
    })
}

const updateUserProfileImage = (req, res) => {
    const temp = {
        photoURL: req.body.photoURL
    };
    User.updateOne({ uid: req.body.uid }, { ...temp })
        .then((doc) => {
            res.status(200).json({ success: true, userInfo: doc });
        })
        .catch((error) => {
            res.status(400).json({ success: false });
            console.log(error);
        })
}




module.exports = { userRegister, updateUserProfileImage };