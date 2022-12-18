module.exports = (sequelize, DataTypes) => {
    const Person = sequelize.define('Persons', {
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
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Person;
}