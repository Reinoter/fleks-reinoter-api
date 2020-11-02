import express from 'express';
import { Database } from './../db';
import { Auth } from './../auth';
let subscriptionRouter = express.Router();

/*
    Getting subscriptions for user
    Access: user (from parent middlware)
*/
subscriptionRouter.get("/", function(req, res, next){
    Database.Subscription.find({user:req.user._id})
        .populate('car', 'image name')
        .then(docs => res.json(docs))
        .catch(e => next("We couldn't fetch subscription"))
})


/*
    Getting subscriptions by ID.
    Access: user (from parent middlware)
*/
subscriptionRouter.get("/id/:id", function(req, res, next){
    Database.Subscription.findOne({_id: req.params.id})
        .populate('car', 'image name')
        .then(doc => {
            if(!doc) return next("We couldn't find the subscription you were looking for");
            res.json(doc);
        })
        .catch(e => next("We couldn't fetch your subscription"))
})

/*
    Insert subscription
    Access: user (from parent middlware)
*/
subscriptionRouter.put("/", function(req,res,next){
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

export default subscriptionRouter
