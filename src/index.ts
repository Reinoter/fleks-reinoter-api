import express from 'express';
import { Database } from './db';

const app = express();
const port = 3000; // default port to listen

// define a route handler for the default home page
app.get("/", ( req, res ) => {
    res.send("Hello world!");
});



Database.connectToDb()
    .then(() => {
        console.log("Connected to database");
        // start the Express server
        app.listen(port, () => {
            console.log(`server started at http://localhost:${ port }`);
        });
    })
