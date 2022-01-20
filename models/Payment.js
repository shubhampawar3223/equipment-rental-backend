const PAYMENT_STATUS = require('../utils/enums')

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        paymentId: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,          
        },
        orderId: {
           type: DataTypes.BIGINT.UNSIGNED,
           references: {
            model: 'Orders',
            key: 'orderId',
        },         
        },
        buyerId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
             model: 'Buyers',
             key: 'buyerId',
         },
        },
        sellerId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
             model: 'Sellers',
             key: 'sellerId',
         },
        },
        date: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
            validate: {
                isIn: [PAYMENT_STATUS]
            }
        }
    })

    Payment.associate = (models) => {

        Payment.belongsTo(models.Buyer, {
            foreignKey: 'buyerId',
            targetKey: 'buyerId',
        })

        Payment.belongsTo(models.Seller, {
            foreignKey: 'sellerId',
            targetKey: 'sellerId',
        })

        Payment.belongsTo(models.Order, {
            foreignKey: 'orderId',
            targetKey: 'orderId',
        })
    } 

    return Payment
}     