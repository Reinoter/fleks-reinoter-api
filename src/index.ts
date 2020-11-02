import express from 'express';
import { Database } from './db';
import { Auth } from './auth';
import passport from 'passport';
import cors from 'cors';

/* Whitelist used for production environment - not in use currently */
const whitelist = []

const port = 3000; // default port to listen
const app = express();

/* Middelware used for authentication */
app.use(passport.initialize());
app.use(passport.session());

/* Body parser */
app.use(express.json());

/* Allow cors requests */
if(process.argv.indexOf("--prod") == -1) app.use(cors());
if(process.argv.indexOf("--prod") != -1) app.use(cors());

/*
    Setting up passport strategies and express middlware.
    - Important that it comes before app.use router.
*/
Auth.init();

import router from './controllers';
app.use("/api", router);

/* Middle ware used to make error reporting easier, using next() */
app.use(function (err, req, res, next) {
    res.statusMessage = err;
    res.status(400).send(err)
})


/* Connecting to database and initializing mongoose schemas */
Database.connectToDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`server started at http://localhost:${ port }`);
        });
    })
