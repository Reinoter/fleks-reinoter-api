import Mongoose from 'mongoose';

var Subscription = new Mongoose.Schema({
    car: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'car-types',
        required: true
    },
    _created_at: {type: Date, default: Date.now}
});

export { Subscription };
