const express = require('express');
const router = express.Router(); 
const models = require('../models');

router.get('/buyer_test',async(req,res) =>{
  res.send("test")  
})

router.get('/buyer_profile',async(req,res) =>{
  try{
   const buyer = await models.Buyer.findByPk(req.user.Buyer.buyerId, 
   {  include:[{
       model: models.User,
       required: true
   }]})

   if(!buyer){
     throw new Error("Seller not exists.")
   }
   res.send(buyer)
  } 
  catch(error){
   res.status(500).send(resGen.getObj(error.message)) 
  } 
})  

module.exports = router
