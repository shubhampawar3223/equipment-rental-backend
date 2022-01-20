module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        cartItemId: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        buyerId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references : {
                model: 'Buyers',
                key: 'buyerId'   
            },
        },
        equipmentId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references : {
                model: 'Equipments',
                key: 'equipmentId'
            }
        }
    })

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Equipment, {
            foreignKey: 'equipmentId',
            targetKey: 'equipmentId',  
        })

        CartItem.belongsTo(models.Buyer, {
            foreignKey: 'buyerId',
            targetKey: 'buyerId',  
        })
    }
    return new CartItem
}       