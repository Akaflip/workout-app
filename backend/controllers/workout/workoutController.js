import Workout from "../../models/workoutModel.js";
import asyncHandler from 'express-async-handler';

export const addNewWorkout = asyncHandler(async (req, res) => {
    const {name, exercisesIds} = req.body;

    const workout = await Workout.create({
        name, 
        exercises: exercisesIds
    });

    res.json(workout);

});

export const getWorkout = asyncHandler(async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    .populate('exercises')
    .lean();

    const minutes = Math.ceil(workout.exercises.length * 3.7);

    res.json({ ...workout, minutes});
});

export const updateWorkout = asyncHandler(async (req, res) => {
    const { name, exercisesIds, workoutId } = req.body;

    const workout = await Workout.findById(workoutId);

    if(!workout) {
        res.status(404);
        throw new Error('Данное тренировка не найдено');
    };

    workout.name = name;
    workout.exercises = exercisesIds;

    const updatedWorkout = await workout.save();

    res.json(updatedWorkout);
});


export const deleteWorkout = asyncHandler(async (req, res) => {
    const { workoutId } = req.body;

    const workout = await Workout.findById(workoutId);

    if(!workout) {
        res.status(404);
        throw new Error('Данная тренировка не найдено');
    };

    workout.remove()

    res.json({
        message: 'Workout has been deleted'
    });
});