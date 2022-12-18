module.exports = (sequelize, DataTypes) => {
    const CoursesHeadquarter = sequelize.define('Courses_Headquarters', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        course_id: {
            type: DataTypes.INTEGER
        },
        headquarter_id: {
            type: DataTypes.INTEGER
        }
    },{
        freezeTableName: true,
        timestamps: false
    });

    return CoursesHeadquarter;
}