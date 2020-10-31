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
    status: {
        type: String,
        enum: ["confirmed", "scheduled", "delivered"],
        default: "confirmed"
    },
    created_at: {type: Date, default: Date.now}
});

export { Subscription };
