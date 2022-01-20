const EQUIPMENT_STATUS = require('../utils/enums')

module.exports = (sequelize, DataTypes) => {
    const Equipment = sequelize.define('Equipment', {
        equipmentId: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        sellerId: {
            type: DataTypes.BIGINT.UNSIGNED,
            references: {
                model: 'Sellers',
                key: 'sellerId'   
            },
        },
        modelName: {
            type: DataTypes.STRING,
        },
        specification: {
            type: DataTypes.STRING,
        },
        equipmentPic: {
            type: DataTypes.STRING,
        },
        categoryName:{
            type: DataTypes.STRING,
            references: {
                model: 'Categories',
                key: 'categoryName'
            },
        },
        subCategoryName: {
            type: DataTypes.STRING,
            references: {
                model: 'SubCategories',
                key: 'categoryName'
            },
        },
        pricePerDayUnit: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.STRING,
            validate: {
                isIn: [EQUIPMENT_STATUS],
            },
        }
    })

    Equipment.associate = (models) => {

        Equipment.belongsTo(models.Seller, {
            foreignKey: 'sellerId',
            targetKey: 'sellerId',
        })

        Equipment.belongsTo(models.Category, {
            foreignKey: 'categoryName',
            targetKey: 'categoryName',
        })

    }

    return Equipment
}    
