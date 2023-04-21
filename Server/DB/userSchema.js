const mongoose = require("mongoose");
const bycryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    Occupation: {
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

userSchema.pre("save", async function(next) {
    // console.log("Hie from pre user schema")
    if(this.isModified("userPassword")){
        this.userPassword = await bycryptjs.hash(this.userPassword, 10)
    }
    next();
});

const UserModel = mongoose.model("UserData", userSchema);

module.exports = UserModel;