module.exports = function(sequelize, DataTypes){
    return sequelize.define('packlist', {
        tripId: DataTypes.INTEGER,
        packItem: DataTypes.STRING,
        who: DataTypes.STRING
        // listOfItems: DataTypes.STRING
    });
};