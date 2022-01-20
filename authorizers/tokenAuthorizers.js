const jwt = require('jsonwebtoken');
const resGen = require('../utils/response-generator')

module.exports = (req,res,next) =>{
    if(!req.headers.authorization){
        res.status(403).send(resGen.getObj('UnAuthorized'));
        return
    }

    jwt.verify(req.headers.authorisation,process.env.JWT_KEY, { algorithms: ['RS256'] },(err, result)=>{
        if(err){
        res.status(403).send(resGen.getObj('UnAuthorized'));
        }
        else if(!result.email){
        res.status(403).send(resGen.getObj('UnAuthorized'));
        }
        else{
        req.token = result;
        req.token.email = result.email.toLowerCase().trim();     
        next()
        }
    })
}