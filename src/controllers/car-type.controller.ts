import express from 'express';
import { Database } from './../db';
import { Auth } from './../auth';
let carTypeRouter = express.Router();

carTypeRouter.get("/", function(req, res, next){
    Database.CarType.find({})
        .then(docs => res.json(docs))
        .catch(e => next("We couldn't fetch car types"))
})

//Insert carType
carTypeRouter.put("/", function(req,res,next){
    new Database.CarType(req.body).save()
    .then((carType) => res.json(carType))
    .catch(e => {
        next("We couldn't create the car type!")
    });
});

//Insert carType
carTypeRouter.post("/id/:id", function(req,res,next){
    Database.CarType.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
    .then((carType) => res.json(carType))
    .catch(e => {
        console.error(e);
        next("We couldn't create the car type!")
    });
});

export default carTypeRouter
