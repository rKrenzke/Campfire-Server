
const Sequelize = require('sequelize');
const user = require('./models/user');

const sequelize = new Sequelize('campfire', 'postgres', 'Mast3rGandal1f', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to Database')
    },
    function(err){
        console.log(err);
    }
);

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres'
// });
let User = require('../models/user')(sequelize, require("sequelize"));
let Buddies = require('../models/buddies')(sequelize, require("sequelize"));
User.hasMany(Buddies);
Buddies.belongsTo(User);

module.exports = sequelize;