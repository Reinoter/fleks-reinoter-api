import express from 'express';
import userRouter from './user.controller';
import carTypeRouter from './car-type.controller';
import subscriptionRouter from './subscription.controller';

// Did not find an ES6 equvivalent
const jwt = require('express-jwt');

let router = express.Router();
router.use("/user", userRouter);
router.use("/car-type", carTypeRouter);
router.use("/subscription", jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'] 
}), subscriptionRouter);

export default router;
