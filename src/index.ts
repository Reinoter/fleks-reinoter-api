import express from 'express';
import { Database } from './db';
import { Auth } from './auth';
import passport from 'passport';
import router from './controllers';
import cors from 'cors';

const whitelist = [
    "https://domain.com"
]
const port = 3000; // default port to listen
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
if(process.argv.indexOf("--prod") == -1) app.use(cors());
if(process.argv.indexOf("--prod") != -1) app.use(cors(whitelist));
app.use("/api", router);
app.use(function (err, req, res, next) {
    res.statusMessage = err;
    res.status(400).send(err)
})

// define a route handler for the default home page
app.get("/", ( req, res ) => {
    res.send("Hello world!");
});

Auth.init();
Database.connectToDb()
    .then(() => {
        console.log("Connected to database");
        // start the Express server
        app.listen(port, () => {
            console.log(`server started at http://localhost:${ port }`);
        });
    })
