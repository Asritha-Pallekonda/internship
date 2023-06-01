module.exports = (sequelize, DataTypes) => {

    const Review = sequelize.define("review", {
        quantity: {
            type: DataTypes.INTEGER
        },
        stocktype: {
            type: DataTypes.TEXT
        },
        date: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.TEXT
        }

    })

    return Review

}