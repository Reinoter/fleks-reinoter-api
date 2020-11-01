import express from 'express';
import { Database } from './../db';
import { Auth } from './../auth';
let userRouter = express.Router();

//Insert user
userRouter.put("/", async function(req,res,next){
    var emailExp = new RegExp("^" + req.body.email + "$", 'i');
    Database.User.findOne({email: emailExp})
        .then(async (doc) => {
            if(doc) return next("Email has allready been used");
            new Database.User(req.body).save()
                .then((user) => res.json(Auth.formatUserReturn(user)))
                .catch(e => {
                    next("We couldn't create your account")
                });
        })
        .catch(e => next(e));
});

userRouter.post('/login', function (req, res, next){
      var method = req.body.email?'local':'bearer';
      Auth.authenticate(method, req, res, next, function(err, user, info) {
        if(err) return next(err);
        if (!user) return res.status(401).send(info);
        res.json(user);
    });
});

userRouter.get('/logout', function(req, res){
  req.logout();
  res.status(200).send();
});

export default userRouter
