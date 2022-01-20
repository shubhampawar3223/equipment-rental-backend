const models = require('../models');

module.exports = async(req,res,next) =>{
    const user = await models.User.findOne({
        where: {
            email: req.token.email
        },
        include: [{
            model: models.Seller,
        }],
    })
    if(!user){
        res.status(403).send(resGen.getObj('User not found.'));      
    }
    else if(user.role !== 'SELLER') {
        res.status(403).send(resGen.getObj('Invalid role.'));      
    }

    user = user.get({plain: true});
    req.user = user
    next()
}
