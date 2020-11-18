module.exports = function(sequelize, DataTypes){
    return sequelize.define('packlist', {
        tripId: DataTypes.INTEGER,
        // listOfItems: DataTypes.ARRAY(DataTypes.STRING)
        listOfItems: DataTypes.STRING
    });
};