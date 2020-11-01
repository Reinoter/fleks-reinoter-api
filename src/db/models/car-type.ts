import Mongoose from 'mongoose';

var CarType = new Mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    modelYear: {
        type: Number,
        required: true
    },
    transmissionType: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    trunkSpace: {
        type: String,
        required: true
    },
    _created_at: {type: Date, default: Date.now}
});

export { CarType };
