const Sequelize = require('sequelize');

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

//DB Associations



module.exports = sequelize;