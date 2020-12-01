module.exports = function(sequelize, DataTypes){
    return sequelize.define('trip', {
        userId: DataTypes.INTEGER,
        campsiteName: DataTypes.STRING,
        siteDescription: DataTypes.TEXT,
        totalSites: DataTypes.INTEGER,
        contactEmail: DataTypes.STRING,
        contactPhone: DataTypes.STRING,
        siteAddress: DataTypes.STRING,
        operatingHours: DataTypes.STRING,
        reservationUrl: DataTypes.STRING,
        nights: DataTypes.INTEGER,
        costPerNight: DataTypes.INTEGER,
        siteImage: DataTypes.STRING,
        campsiteReserved: DataTypes.BOOLEAN,
        recreationPassport: DataTypes.BOOLEAN,
        fireRestrictions: DataTypes.BOOLEAN,
        rusticSite: DataTypes.BOOLEAN,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE

    });
};