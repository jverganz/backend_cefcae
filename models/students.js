module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Students', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        person_id: {
            type: DataTypes.INTEGER
        },
        state: {
            type: DataTypes.ENUM({
                values: ['ACTIVE', 'INACTIVE']
            })
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Student;
}