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

app.use(express.json());
app.use(require('./middlewares/cors'));

//* Open routes
app.use('/user', user);

//*Authenticated Routes
app.use('/tripList', trip);
app.use('/packList', pack);

app.listen(process.env.PORT, function(){
    console.log(`Server is listening on ${process.env.PORT}`)
});