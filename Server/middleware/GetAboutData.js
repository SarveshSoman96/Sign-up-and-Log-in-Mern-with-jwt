const jwt = require("jsonwebtoken");
const User = require("../DB/userSchema");

const getUserProfileData = async (req, res, next) => {
    try {
        
        const token = req.cookies.accessToken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const verifiedUser = await User.findOne({_id: verifyToken._id, "tokens.token": token})

        if(!verifiedUser) {
            res.send({messsage: "Unable to fetch info. User not registered"})
        }
        else{
            req.token = token;
            req.verifiedUser = verifiedUser;
            req.userId = verifiedUser._id;
            
            console.log(verifiedUser)
        }

        next();

    } catch (error) {
        res.status(401).send({messsage: "Unauthorized. No token provided"})
        console.log(error)
    }
};

module.exports =  getUserProfileData;