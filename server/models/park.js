import mongoose from 'mongoose';

const parkSchema = mongoose.Schema({
    name: String,
    messLevel: {
        type: Number,
        default: 5
    },
    lat: Number,
    long: Number,
    bench: {
        type: String,
        default: null,
    },
    bird: {
        type: String,
        default: null,
    },
    tree: {
        type: String,
        default: null,
    },
    background: {
        type: String,
        default: null,
    },
    extras: [String],
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var Park = mongoose.model('Park', parkSchema);

export default Park;
