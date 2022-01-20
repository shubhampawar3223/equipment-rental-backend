const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models')
require('dotenv').config();
const port = process.env.PORT || 3000;

const tokenAuthorizer = require('./authorizers/tokenAuthorizers')
const buyerAuthorizer = require('./authorizers/buyerAuthorizer')
const sellerAuthorizer = require('./authorizers/sellerAuthoriser')

const openRouter = require('./routes/openApi')
const buyerRouter = require('./routes/buyerApi')
const sellerRouter = require('./routes/sellerApi')

app.use(cors())
app.use(express.json())

app.use('/open', openRouter)

app.use(tokenAuthorizer)

app.use('/buyer', buyerAuthorizer)
app.use('/buyer', buyerRouter)

app.use('/seller', sellerAuthorizer )
app.use('/seller', sellerRouter)

app.get('/',(req,res)=>{
    res.status(200).send("Working")
})

db.sequelize.sync().then(()=>{
    app.listen(port,()=>console.log(`listening is listening on ${port}`));
})

