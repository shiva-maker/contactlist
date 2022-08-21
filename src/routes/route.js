const express = require('express')
const router = express.Router()
const { createUser,  getUserProfile, updateUser, getAllUserProfile} = require("../controllers/userController") 

// User APIs
router.post("/register",createUser)  //route to register user name and phone
router.get("/user/profile", getUserProfile) //route to get user profile 
router.post("/user/profileAll",  getAllUserProfile) //route to get all user profile
router.post("/user/profile", updateUser )  //route to update contact

// if api is invalid OR wrong URL
router.all("/*", function (req, res) {
    res
      .status(404)
      .send({ status: false, message: "The api you requested is not available" });
  });
  
module.exports =router