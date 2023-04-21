const mongoose = require("mongoose");
const bycryptjs = require("bcryptjs");
const jwttoken = require("jsonwebtoken");

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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
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


userSchema.methods.generateAuthToken =  async function (){
    try {
        let token = jwttoken.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token
    } catch (error) {
        console.log(error)
    }
}

const UserModel = mongoose.model("UserData", userSchema);

module.exports = UserModel;