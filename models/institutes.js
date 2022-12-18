module.exports = (sequelize, DataTypes) => {
    const Institute = sequelize.define('Institutes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type_document_id: {
            type: DataTypes.INTEGER
        },
        document_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url_logo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    });

    return Institute;
}