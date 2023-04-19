const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userEmailAddress: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

const UserModel = mongoose.model("UserData", userSchema);

module.exports = UserModel;