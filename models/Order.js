const ORDER_STATUS = require('../utils/enums')
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        orderId:{
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        date:{
           type: DataTypes.STRING, 
        },
        status:{
           type: DataTypes.STRING, 
            validate: {
              isIn: [ORDER_STATUS]  
            },
        },
        equipmentId:{
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'Equipments',
                key: 'equipmentId',
            },
        },
        buyerId:{
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'Buyers',
                key: 'buyerId',
            },
        },        
        sellerId:{
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'Sellers',
                key: 'sellerId',
            },
        },
        quantity:{
            type: DataTypes.INTEGER,
        },
        totalRent:{
            type: DataTypes.INTEGER,
        },
        startDate:{
            type: DataTypes.DATE, 
        },
        endDate:{
            type: DataTypes.DATE, 
        }    
    })

    Order.associate = (models) => {
        Order.hasOne(models.Payment, {
            foreignKey: 'orderId',
            targetKey: 'orderId',
        })

        Order.belongsTo(models.Equipment, {
            foreignKey: 'equipmentId',
            targetKey: 'equipmentId',
        })

        Order.belongsTo(models.Seller, {
            foreignKey: 'sellerId',
            targetKey: 'sellerId',
        })

        Order.belongsTo(models.Buyer, {
            foreignKey: 'buyerId',
            targetKey: 'buyerId',
        })
    }

    return Order
}