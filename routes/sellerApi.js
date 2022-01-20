const express = require('express');
const router = express.Router(); 
const models = require('../models');
const resGen = require('../utils/response-generator');

router.get('/seller_test',async(req,res) =>{
    res.send("Seller")  
  })

router.get('/seller_profile',async(req,res) =>{
   try{
    const seller = await models.Seller.findByPk(req.user.Seller.sellerId, 
    {  include:[{
        model: models.User,
        required: true
    }]})

    if(!seller){
      throw new Error("Seller not exists.")
    }
    res.send(seller)
   } 
   catch(error){
    res.status(500).send(resGen.getObj(error.message)) 
   } 
})  

module.exports = router
