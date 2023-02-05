const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
    },
    userNum: Number,
    email: {
        type: String,
        required: true,
    },
    uid: String,
    photoURL: String,
}, { collection: "users" });

const User = mongoose.model("User", userSchema);
module.exports = User;