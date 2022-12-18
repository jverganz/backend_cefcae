module.exports = (sequelize, DataTypes) => {
    const TypeDocument = sequelize.define('Type_Documents', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        abbreviation: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return TypeDocument;
}