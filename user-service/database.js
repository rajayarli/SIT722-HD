const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");


require("dotenv").config();
const mongoose = require("mongoose");
let uri;

uri = "mongodb+srv://root:toor@cluster0.2kjjmyt.mongodb.net/?retryWrites=true&w=majority"


mongoose
    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log(err));

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
