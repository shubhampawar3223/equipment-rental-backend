module.exports = (sequelize, DataTypes) => {
    const Seller = sequelize.define('Seller', {
        sellerId : {
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

    Seller.associate = (models) => {
        Seller.belongsTo(models.User, {
            foreignKey: 'uId',
            targetKey: 'uId',
        })

        Seller.hasMany(models.Equipment, {
            foreignKey: 'sellerId',
            targetKey: 'sellerId',
        })

        Seller.hasMany(models.Order, {
            foreignKey: 'sellerId',
            targetKey: 'sellerId',
        })
    }
    return Seller
}    