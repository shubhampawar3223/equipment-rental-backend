const Sequelize = require('sequelize');
const USER_ROLE = require('../utils/enums')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      uId: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING, 
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        }, 
        required: true,
      },
      password: {
        type: DataTypes.STRING, 
      },
      phoneNo: {
        type: DataTypes.STRING,
        validate: {
          len: 10,  
        }  
      },
      profilePic: {
        type: DataTypes.STRING
      },
      role: {
         type: DataTypes.STRING,
         validate: {
             isIn: [USER_ROLE]
         }, 
         defaultValue: 'BUYER',
      },
  },{
     indexes: [
     {
        fields: ['email'], 
     },
     {
        fields: ['phoneNo'], 
     }
    ] 
  })

  User.associate = (models) => {
    User.hasOne(models.Buyer, {
        foreignKey: 'uId',
        targetKey: 'uId',
    })

    User.hasOne(models.Seller, {
      foreignKey: 'uId',
      targetKey: 'uId',
  })
    }
  return User
}