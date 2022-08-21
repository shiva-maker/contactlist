const bcrypt = require("bcrypt")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")
 //used user model as contact names 
 //used product model as phone numbers

//function for create user api
const createUser = async function (req, res) {
    try {
        
        let {name,phone} = req.body

        //validation for name
        if (!(name)) {
            return res.status(400).send({ status: false, message: "name is required" })
        }
        if (!(phone)) {
            return res.status(409).send({ status: false, message: "Phone number required" })
        }
        const findContactName = await userModel.find({ name: contactName });

        const findContactphone = await userModel.find({ contactId: findContactName._id });
       
        if (findContactphone) {
            return res.status(409).send({ status: false, message: "Phone number already exist" })
        }
       
        if (findContactName) {
            //creating user
            let createUserData = await userModel.create({name:name})
            let createphoneData = await productModel.create({ contactId: findContactName._id,phone:phone})
            return res.status(201).send({ status: true, message: "contact created successfully", data: findContactName })
        }
    } catch (err) {

        return res.status(500).send({ status: false, message: err.message })
    }

}

//function for get specific contact api 
const getUserProfile = async function (req, res) {
    try {
        //taking user id from params
        const {name} = req.body
         const data=userModel.aggregate([
             {
                 $match:{
                     name:name
                 }
             },
             {
                 $lookup:{
                     from:productModel,
                     localField:_id,
                     foreignField:contactId,
                     as:phone
                 }
             },
             {
                 $unwind:{
                     path:$phone
                 }
             },
             {
                 $project:{
                     name:1,
                     phone:$phone.phone
                 }
             }
         ])
        return res.status(200).send({ status: true, message: "User profile details", data: data })
    } catch (error) {

        return res.status(500).send({ status: false, Error: error.message })
    }
}

//function to get all contact
const getAllUserProfile = async function (req, res) {
    try {
        //taking user id from params
        const { name } = req.body
        const data = userModel.aggregate([
            {
                $match: {
                    deletedAt: null
                }
            },
            {
                $lookup: {
                    from: productModel,
                    localField: _id,
                    foreignField: contactId,
                    as: phone
                }
            },
            {
                $unwind: {
                    path: $phone
                }
            },
            {
                $project: {
                    name: 1,
                    phone: $phone.phone
                }
            }
        ])
        return res.status(200).send({ status: true, message: "User profile details", data: data })
    } catch (error) {

        return res.status(500).send({ status: false, Error: error.message })
    }
}

//function for update api
const updateUser = async (req, res) => {

    try {
        
        let { name,phone } = req.body

           if (!(phone)) {
            if (!(phone)) {
                return res.status(400).send({ status: false, message: "Phone is required" })
            }

            if (!(name)) {
                return res.status(400).send({ status: false, message: "Name is required" })
            }

            //checking for unque phone number in db
            let uniquePhone = await productModel.findOne({ phone: phone })

            //if found
            if (uniquePhone) {
                return res.status(400).send({ status: false, msg: "Phone number already exist" })
            }
        }

        //updating doucument of user
        let findUser = await userModel.find({ name: name })
        let createphoneData = await productModel.create({ contactId: findUser._id, phone: phone })
        res.status(201).send({ status: true, message: "User profile updated", data: updateUser });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}



module.exports = { createUser, getUserProfile, updateUser, getAllUserProfile }
