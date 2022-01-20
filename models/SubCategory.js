module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define('SubCategory', {
        subCategoryName: {
            type: DataTypes.STRING,
            primaryKey: true,
        }   
    })
    
    SubCategory.associate = (models) =>{
        SubCategory.belongsTo(models.Category, {
            foreignKey: 'categoryName',
            targetKey: 'categoryName',
        })
    }

    return SubCategory
}