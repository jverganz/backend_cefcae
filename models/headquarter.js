module.exports = (sequelize, DataTypes) => {
    const Headquarter = sequelize.define('Headquarters', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_headquarter: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        institute_id: {
            type: DataTypes.INTEGER
        },
        state: {
            type: DataTypes.ENUM({
                values: ['ACTIVE', 'INACTIVE']
            })
        }
    },{
        freezeTableName: true,
        timestamps: false
    });

    return Headquarter;
}