require('dotenv').config();
const express = require('express');
const app = express();

let sequelize = require('./db');
let user = require('./controllers/userController');
let pack = require('./controllers/packListController');
let trip = require('./controllers/tripController');




sequelize.authenticate().then(async () => {
    console.log('Database CONNECTED');
    sequelize.sync();
})
.catch((e) => {
    console.log(e);
    console.log('NO DATABASE CONNECTION')
})

//Database assosications

let User = require('./models/user')(sequelize, require("sequelize"));
let Trip = require('./models/trip')(sequelize, require("sequelize"));
let PackList = require('./models/packList')(sequelize, require("sequelize"));

User.hasMany(Trip);
Trip.belongsTo(User);
// Trip.hasMany(User);
// Trip.belongsToMany(User);

Trip.hasOne(PackList);
PackList.belongsTo(Trip);

app.use(express.json());
app.use(require('./middleware/cors'));

//* Open routes
app.use('/user', user);

//*Authenticated Routes
app.use('/tripList', trip);
app.use('/packList', pack);


app.listen(process.env.PORT, function(){
    console.log(`Server is listening on ${process.env.PORT}`)
});