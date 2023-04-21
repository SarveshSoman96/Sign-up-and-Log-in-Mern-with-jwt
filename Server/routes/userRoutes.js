const express = require("express");
const router = express.Router();
const getUserProfileData = require("../middleware/GetAboutData")

const bycryptjs = require("bcryptjs");

const User = require("../DB/userSchema")

router.get("/", (req, res) => {
    res.send("hello from router js")
})


router.post("/signup", async (req, res) => {
    
    try {
        const { firstName, lastName, Occupation, phone, userEmailAddress, userPassword } = req.body;
        if(!firstName || !lastName || !Occupation || !phone || !userEmailAddress || !userPassword) res.status(422).json({message: "One or more fields are empty"})
        
        const userFound = await User.findOne({userEmailAddress});

        if(userFound){
            res.status(409).json({message: "User with email already exists"})
        }
        else{

            const NewUser = new User(req.body);
            
            await NewUser.save()
            
            res.status(200).json({message: "User registered successfully. Please log in"})
        }

    } catch (error) {
        console.log(error)
    }

})

router.post("/login", async (req, res) => {
    
    try {
        const {userEmailAddress, userPassword} = req.body

        if(!userEmailAddress || !userPassword) res.status(400).json({message: "Invalid or missing credentials"})

        const foundUser = await User.findOne({userEmailAddress});

        if(foundUser){
            const isMatch = bycryptjs.compare(userPassword, foundUser.userPassword)

            let token = await foundUser.generateAuthToken();

            if(!isMatch){
                res.status(409).json({message: "Invalid or missing credentials"});
            }
            else{
               
                res
                  .status(200)
                  .json({
                    message: "Log in successfull",
                    token,
                    userData: {
                      UserId: foundUser._id,
                      userName: foundUser.firstName,
                    },
                  });

            }
        }
        else{
            res.status(409).json({message: "You are not registered"});
        }

    } catch (error) {
        console.log(error)
    }

});


router.get("/profile", getUserProfileData,  (req, res) => {
    console.log("Hello my profile page")
    console.log(req.verifiedUser);
    res.send(req.verifiedUser);
} )

module.exports = router;