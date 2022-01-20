module.exports = (sequelize, DataTypes) => {
    const Buyer = sequelize.define('Buyer', {
        buyerId :{
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        uId:{
           type: DataTypes.BIGINT.UNSIGNED,
           references: {
               model: 'Users',
               key: 'uId',
           } 
        }
    })

    Buyer.associate = (models) => {
        Buyer.belongsTo(models.User, {
            foreignKey: 'uId',
            targetKey: 'uId',
        })

        // Buyer.hasMany(models.CartItem, {
        //     foreignKey: 'buyerId',
        //     targetKey: 'buyerId',
        // })

        Buyer.hasMany(models.Order, {
            foreignKey: 'buyerId',
            targetKey: 'buyerId',
        })
    }
    return Buyer
}    