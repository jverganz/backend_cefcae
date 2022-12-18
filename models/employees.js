module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employees', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        person_id: {
            type: DataTypes.INTEGER
        },
        type_employee: {
            type: DataTypes.ENUM({
                values: ['ADMIN', 'PROFESSOR']
            })
        },
        state: {
            type: DataTypes.ENUM({
                values: ['ACTIVE', 'INACTIVE']
            })
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });

    return Employee;
}