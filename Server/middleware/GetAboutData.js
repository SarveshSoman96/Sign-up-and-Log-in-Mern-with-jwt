const jwt = require("jsonwebtoken");
const User = require("../DB/userSchema");

const getUserProfileData = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];

    const token = tokenHeader.split(" ")[1];

    if(token){

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const verifiedUser = await User.findOne({
        _id: verifyToken._id,
        "tokens.token": token,
        });

            const { firstName, lastName, Occupation, phone, userEmailAddress } =
            verifiedUser;

            req.token = token;
            req.verifiedUserInfo = {
            firstName,
            lastName,
            Occupation,
            phone,
            userEmailAddress,
            };
            req.userId = verifiedUser._id;

            // console.log(verifiedUser);
            next();
        }
        else{
            res.status(401).send({ messsage: "Unauthorized. No token provided" });
        }

    

  } catch (error) {
    res.status(401).send({ messsage: "Unauthorized. No token provided" });
    console.log(error);
  }
};

module.exports = getUserProfileData;
