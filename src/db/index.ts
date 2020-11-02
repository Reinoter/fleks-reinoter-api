import Mongoose from 'mongoose';

/* Default  collection.ensureIndex is deprecated*/
Mongoose.set('useCreateIndex', true);

/* Fleks account in MongoDB cluster */
const config = require('./../../cfg/db_auth.json')
/* Using local DB for dev environment */
const offline_config = require('./../../cfg/db_auth_offline.json');

/* Mongoose models */
import * as models from './models';

export class Database{
    /* These variables gives us access to their tables in mongodb */
    static _User:any;
    static _CarType:any;
    static _Subscription:any;

    static get Subscription(){
        return this._Subscription;
    }
    static get CarType(){
        return this._CarType;
    }
    static get User(){
        return this._User;
    }

    /*
        1. Creating mongodb connection
        2. Adding error handling

        Resolves empty response on success, static varible defined.
    */
    public static connectToDb(){
        return new Promise((resolve, reject) => {
            var dbURL = config.URL;
            if(process.argv.indexOf("--prod") == -1) dbURL = offline_config.URL;

            Mongoose.createConnection(dbURL, { useFindAndModify:false, useNewUrlParser: true, dbName: 'fleks', useUnifiedTopology: true })
            .then(conn => {
                conn.on('error', this.handleMongodbError)
                this.initSchemas(conn);
                console.log("Connected to database");
                resolve()
            })
            .catch(e => reject(e))
        })
    }

    /* Intializing mogoose schemas / table access */
    static initSchemas(connection){
        this._User = connection.model('users', models.User);
        this._Subscription = connection.model('subscriptions', models.Subscription);
        this._CarType = connection.model('car-types', models.CarType);
    }

    /* Error handler */
    static handleMongodbError(e:any){
        console.error(e);
        process.exit();
    }
}
