module.exports = (sequelize, DataTypes) => {
    const Enrollment = sequelize.define('Enrollments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total: {
            type: DataTypes.DOUBLE
        },
        method_payment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM({
                values: ['ACTIVE', 'INACTIVE', 'TERMINATED']
            })
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        headquarter_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        freezeTableName: true,
        timestamps: false
    });

    return Enrollment;
}