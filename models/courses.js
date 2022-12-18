module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define('Courses', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
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
    },{
        freezeTableName: true,
        timestamps: false
    });

    return Courses;
}