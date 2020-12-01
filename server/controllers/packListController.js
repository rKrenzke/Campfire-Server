let router = require('express').Router();
let sequelize = require('../db');
let Trip = require('../models/trip')(sequelize, require("sequelize"));
let PackList = require('../models/packList')(sequelize, require("sequelize"));
let validateSession = require('../middleware/validate-session');

//Create - create pack list for trip
router.post('/newPackList', validateSession, (request, response) => {
    let tripId = request.body.packList.tripId
    let packItem = request.body.packList.packItem;
    let who = request.body.user.userName
    PackList
    .create({
        tripId,
        packItem,
        who
    })
    .then(
        function createSuccess(data){
            response.json(data);
        },
        function createError(err){
            response.send(500, err.message);
        }
    );
})
//Read - get pack list for a trip
router.get('/getList/:id', validateSession, (request, response) => {
    let tripId = request.params.id

    PackList
    .findAll({where: {tripId: tripId}})
    .then(
        function findAllSuccess(data){
            response.json(data);
        },
        function findAllError(err){
            response.send(500, err.message);
        }
    );
})
//Update - modify existing pack list
router.put('/:id', function(request, response){
    let data = request.params.id;
    let packItem = request.body.packList.newItem;

    PackList
    .update({
        packItem
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedList){
            response.send(updatedList);
        },
        function updateError(err){
            response.send(500, err.message);
        }
    )
});
//Delete - delete pack list
router.delete('/:id', validateSession, function(request, response){
    let data = request.params.id;

    PackList
        .destroy({
            where: {id: data}
        }).then(
            function deleteListSuccess(data){
                response.send("Item Deleted");
            },
            function deleteListError(err){
                response.send(500, err.message);
            }
        );
});

module.exports = router;