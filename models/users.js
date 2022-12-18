module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        student_id: {
            type: DataTypes.INTEGER
        },
        employee_id: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
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

    return User;
}