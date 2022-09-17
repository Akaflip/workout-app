import mongoose from "mongoose";


const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    times: {
        type: Number,
        required: true,
    },
    imageIdx: {
        type: String
    }
}, {
    minimize: false,
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;