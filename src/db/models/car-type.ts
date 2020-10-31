import Mongoose from 'mongoose';

var CarType = new Mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    prices: {
        type: Number,
        required: true
    },
    modelYear: {
        type: Number,
        required: true
    },
    transmissionType: {
        type: String,
        enum: ["Automatic", "Manual"],
        required: true
    },
    fuelType: {
        type: String,
        enum: ["Electric" ,"Gasoline", "Diesel", "Petroleum", "Natural Gas", "Ethanol", "Bio-diesel"],
        required: true
    },
    trunkSpace: {
        type: Number,
        default: 0
    },
    _created_at: {type: Date, default: Date.now}
});

export { CarType };
