const User = require('../models/User')
const bcryptjs = require("bcryptjs")
const sendMail = require('../config/mailService')

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message);                
    }
}

exports.createUsers = async (req, res, next) => {
    try {
        const {name, email, password} =  req.body;

        const hashedPassword = await bcryptjs.hash( password,10)

        const newUser = await User.create({name, email, password:hashedPassword});

        //send welcome email
        const subject = 'welcomee to code crafters';
        const text = `hi ${name}, welcome to our platform. we're glad to have you onboard`;
        const html = `
        <h1> welcome, ${name} </h1>
        <h1> Email: ${email} </h1>
        <p>we are excited to have you join us. if you have any question, feel free to reach out to our support team.</p>
        `;
        await sendMail(email, subject, text, html)

        res.status(201).json({message: 'user created successfully. check your mailbox for a welcome message', user: newUser, email: newUser.email})
    } catch (error) {
        console.log(error.message);
        
    }
}

exports.getUserByid = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:'server error', error})
    }    
}

exports.updateUserById = async (req, res, next) => {
    try {
        const {name, email, password} =  req.body;
        const hashedPassword = await bcryptjs.hash( password,10)
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {name, email, password:hashedPassword},
            {new:true}
        );
        if (!updatedUser) {
            return res.status(404).json({message:'user not found'})            
        }
        return res.status(200).json({message:'user updated successfully', user: updatedUser})

    } catch (error) {
        console.log(error.message);
    }
    
}
exports.deleteUserById = async (req, res, next) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if (!deleteUser) {
            return res.status(404).json({message:'user not found'})            
        }
        return res.status(200).json({message:'user deleted successfully', user: deleteUser})

    } catch (error) {
        console.log(error.message);
    }
    }