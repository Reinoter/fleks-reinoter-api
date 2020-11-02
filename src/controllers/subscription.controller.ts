import express from 'express';
import { Database } from './../db';
import { Auth } from './../auth';
let subscriptionRouter = express.Router();

subscriptionRouter.get("/", function(req, res, next){
    Database.Subscription.find({})
        .then(docs => res.json(docs))
        .catch(e => next("We couldn't fetch subscription"))
})

subscriptionRouter.get("/id/:id", function(req, res, next){
    Database.Subscription.findOne({_id: req.params.id})
        .then(doc => {
            if(!doc) return next("We couldn't find the subscription you were looking for");
            res.json(doc);
        })
        .catch(e => next("We couldn't fetch your subscription"))
})

//Insert subscription
subscriptionRouter.put("/", function(req,res,next){
    console.log(req.user);

    new Database.Subscription({
        deliveryDate: req.body.deliveryDate,
        address: req.body.address,
        car: req.body.car,
        user: req.user._id
    }).save()
    .then((subscription) => res.json(subscription))
    .catch(e => {
        next("We couldn't create the supscription!")
    });
});

//Insert subscription
subscriptionRouter.post("/id/:id", function(req,res,next){
    Database.Subscription.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
    .then((subscription) => res.json(subscription))
    .catch(e => {
        console.error(e);
        next("We couldn't create the subscription!")
    });
});

export default subscriptionRouter
