import WorkoutLog from "../../models/workoutLogModel.js";
import asyncHandler from 'express-async-handler';

export const addNewWorkoutLog = asyncHandler(async (req, res) => {
    const { workoutId } = req.body;

    const workoutLog = await WorkoutLog.create({
        user: req.user._id,
        workout: workoutId
    });

    res.json(workoutLog);
});

