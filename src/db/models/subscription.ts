import Mongoose from 'mongoose';

var Subscription = new Mongoose.Schema({
    car: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'car-types',
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["confirmed", "scheduled", "delivered"],
        default: "confirmed"
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    created_at: {type: Date, default: Date.now}
});

export { Subscription };
