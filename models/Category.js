module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryName: {
            type: DataTypes.STRING,
            primaryKey: true,
        }
    })

    Category.associate = (models) =>{

        Category.hasMany(models.Equipment, {
            foreignKey: 'categoryName',
            targetKey: 'categoryName',
        })

        Category.hasMany(models.SubCategory, {
            foreignKey: 'categoryName',
            targetKey: 'categoryName',
        })
    }

    return Category
}       