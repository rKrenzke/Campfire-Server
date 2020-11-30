let router = require('express').Router();
let sequelize = require('../db');
let User = require('../models/user')(sequelize, require("sequelize"));
let Trip = require('../models/trip')(sequelize, require("sequelize"));
let validateSession = require('../middleware/validate-session');

//Trip CRUD endpoints

//Create
//POST new trip
router.post('/new', validateSession, function(request, response){
    let userId = request.user.id;
    let campsiteName = request.body.trip.campsiteName;
    let siteDescription = request.body.trip.siteDescription;
    let totalSites = request.body.trip.totalSites;
    let contactEmail = request.body.trip.contactEmail;
    let contactPhone = request.body.trip.contactPhone;
    let siteAddress = request.body.trip.siteAddress;
    let operatingHours = request.body.trip.operatingHours;
    let reservationUrl = request.body.trip.reservationUrl;
    let nights = request.body.trip.nights;
    let costPerNight = request.body.trip.costPerNight;
    let siteImage = request.body.trip.siteImage;
   

    Trip
    .create({
        userId,
        campsiteName,
        siteDescription,
        totalSites,
        contactEmail,
        contactPhone,
        siteAddress,
        operatingHours,
        reservationUrl,
        nights,
        costPerNight,
        siteImage
    })
    .then(
        function createSuccess(data){
            response.send(data);
        },
        function createError(err){
            response.send(err.message);
        }
    );
});

//Read
//GET all trips for user
router.get('/all', validateSession, function(request, response){
    let userid = request.user.id;

    Trip
    .findAll({
        where: {userId: userid} /*include: 'packList'*/
    })
    .then(
        function findAllSuccess(data){
            response.json(data);
        },
        function findAllError(err){
            response.send(500, err.message);
        }
    );
});
//Update
//PUT new rating for existing trip
router.put('/:id', function(request, response){
    let data = request.params.id;
    let nights = request.body.trip.nights;

    Trip
    .update({
        nights: nights
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog){
            response.send(`Trip updated!`);
        },
        function updateError(err){
            response.send(500, err.message);
        }
    )
});


//Delete
//DELETE a trip from Trip List
router.delete('/:id', validateSession, function(request, response){
    let data = request.params.id;
    let user_id = request.user.id;

    Trip
        .destroy({
            where: {id: data, userId: user_id}
        }).then(
            function deleteTripSuccess(data){
                response.send("Trip Deleted");
            },
            function deleteTripError(err){
                response.send(500, err.message);
            }
        );
});



module.exports = router;