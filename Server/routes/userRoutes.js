const express = require("express");
const router = express.Router();

const bycryptjs = require("bcryptjs");

const User = require("../DB/userSchema")

router.get("/", (req, res) => {
    res.send("hello from router js")
})

// Using promises

// router.post("/signup", (req, res) => {
//     const { firstName, lastName, birthdate, phone, userEmailAddress, userPassword } = req.body;
   
//     console.log(email)
//     User.findOne({userEmailAddress: userEmailAddress})
//     .then(userFound => {
//         if(userFound){
//             res.status(422).json({error: "User with the email already exists"})
//         }
//         else{ 
//             const NewUser = new User(req.body)
//             NewUser.save().then(data => {
//                 console.log(data)
//                 res.status(201).json({message: "User data saved successfully"})
//             }).catch(err => {
//                 console.log(err?.message)
//                 res.status(500).json({error: "Failed to register"})
//             })
//         }
//     })
//     .catch(err => {
//         console.log(err?.message)
//     })
// })

// Using async await

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

            if(!isMatch){
                res.status(409).json({message: "Invalid or missing credentials"});
            }
            else{
                res.status(200).json({message: "Log in successfull"});
                // console.log(foundUser)
            }
        }
        else{
            res.status(409).json({message: "You are not registered"});
        }

    } catch (error) {
        console.log(error)
    }

});

module.exports = router;