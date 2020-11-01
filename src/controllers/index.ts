import express from 'express';
import userRouter from './user.controller';
import carTypeRouter from './car-type.controller';

let router = express.Router();
router.use("/user", userRouter);
router.use("/car-type", carTypeRouter);

export default router;
