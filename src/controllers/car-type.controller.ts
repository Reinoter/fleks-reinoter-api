import express from 'express';
import { Database } from './../db';
import { Auth } from './../auth';
let carTypeRouter = express.Router();


/*
    Returning all car types
    Access: all
*/
carTypeRouter.get("/", function(req, res, next){
    Database.CarType.find({})
        .then(docs => res.json(docs))
        .catch(e => next("We couldn't fetch car types"))
})

/*
    Returning car type by ID
    Access: all
*/
carTypeRouter.get("/id/:id", function(req, res, next){
    Database.CarType.findOne({_id: req.params.id})
        .then(doc => {
            if(!doc) return next("We couldn't find the car-type you were looking for");
            res.json(doc);
        })
        .catch(e => next("We couldn't fetch your car-type"))
})

/*
    Inserting car type
    Access: user
*/
carTypeRouter.put("/", Auth.user, function(req,res,next){
    new Database.CarType(req.body).save()
    .then((carType) => res.json(carType))
    .catch(e => {
        next("We couldn't create the car type!")
    });
});

/*
    Updating car type
    Access: user
*/
carTypeRouter.post("/id/:id", Auth.user, function(req,res,next){
    Database.CarType.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
    .then((carType) => res.json(carType))
    .catch(e => {
        console.error(e);
        next("We couldn't create the car type!")
    });
});

export default carTypeRouter
