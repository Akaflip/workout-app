import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const WorkoutSchema = mongoose.Schema({
    name: {type: String, required: true},
    exercises: [
        {
            type: ObjectId,
            ref: 'Exercise',
            required: true
        }
    ]
}, {
    minimize: false,
    timestamps: true
});

const Workout = mongoose.model('Workout', WorkoutSchema);

export default Workout;