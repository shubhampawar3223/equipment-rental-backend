const express = require('express');
const router = express.Router(); 
const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const resGen = require('../utils/response-generator');

//api for buyer login
router.post('/buyer_login',async (req,res)=>{
    try{
    if(!req.body.email){
        throw new Error('Email is Required')
    }

    if(!req.body.password){
        throw new Error('Password is Required')
    }

    const user =  await models.User.findOne({ 
        where: { 
            email: req.body.email
        }
    })

    //validating if user is present
    if(!user){
        throw new Error('User not found')
    }

    if(user.role !== 'BUYER'){
        throw new Error('User is not buyer.')
    }

    const passwordCheck = await bcrypt.compare(req.body.password, user.password)
    
    if(!passwordCheck){
        throw new Error('Incorrect Password')
    }
    const token = await jwt.sign({email: user.email}, process.env.JWT_KEY, {
        algorithm: 'RS256',
    })    
    user = user.get({plain: true})
    delete user.password
    user.token = token
    res.send(user)
    }
    catch(error) {
       res.status(500).send(resGen.getObj(error.message)) 
    }
})

//api for seller login
router.post('/seller_login',async (req,res)=>{
    try{
    if(!req.body.email){
        throw new Error('Email is Required')
    }

    if(!req.body.password){
        throw new Error('Password is Required')
    }

    const user =  await models.User.findOne({ 
        where: { 
            email: req.body.email
        }
    })

    //validating if user is present
    if(!user){
        throw new Error('User not found')
    }

    if(user.role !== 'SELLER'){
        throw new Error('User is not seller.')
    }

    const passwordCheck = await bcrypt.compare(req.body.password, user.password)
    
    if(!passwordCheck){
        throw new Error('Incorrect Password')
    }
    const token = await jwt.sign({email: user.email}, process.env.JWT_KEY, {
        algorithm: 'RS256',
    })    
    user = user.get({plain: true})
    delete user.password
    user.token = token
    res.send(user)
    }
    catch(error) {
       res.status(500).send(resGen.getObj(error.message)) 
    }
})

//api for seller registration
router.post('/seller_register',async (req,res)=>{
    try{
        if(!req.body){
            throw new Error('Invalid input.')
        }

        if(!req.body.email || !req.body.password || !req.body.phoneNo){
            throw new Error('Incomplete input.')
        }

        const user =  await models.User.finOne({ where:{
            email:  req.body.email
        }})

        if(user){
            throw new Error('Seller in already registered.') 
        }

        req.body.role = "SELLER"

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash

        const newUser = await models.User.create(req.body)

        await models.Seller.create({uId: newUser.uId})

        res.send("Success")
    }
    catch(eror){
        res.status(500).send(resGen.getObj(error.message)) 
    }
})

//api for buyer registration
router.post('/buyer_register',async (req,res)=>{
    try{
        if(!req.body){
            throw new Error('Invalid input.')
        }

        if(!req.body.email || !req.body.password || !req.body.phoneNo || !req.body.firstName || !req.body.lastName){
            throw new Error('Incomplete input.')
        }

        const user =  await models.User.finOne({ where:{
            email:  req.body.email
        }})

        if(user){
            throw new Error('Buyer in already registered.') 
        }

        req.body.role = "BUYER"

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)
        req.body.password = hash

        const newUser = await models.User.create(req.body)
        
        await models.Buyer.create({uId: newUser.uId})

        res.send("Success")
    }
    catch(eror){
        res.status(500).send(resGen.getObj(error.message)) 
    }
})

module.exports = router
