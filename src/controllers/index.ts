import express from 'express';
import userRouter from './user.controller';
import carTypeRouter from './car-type.controller';
import subscriptionRouter from './subscription.controller';
import { Auth } from './../auth'

let router = express.Router();
router.use("/user", userRouter);
router.use("/car-type", carTypeRouter);
router.use("/subscription", Auth.user, subscriptionRouter);

export default router;
