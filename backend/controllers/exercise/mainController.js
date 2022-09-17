import Exercise from "../../models/exerciseModel.js";
import asyncHandler from 'express-async-handler';

export const addNewExercise = asyncHandler(async (req, res) => {
    const {name, times, imageIdx} = req.body;

    const exercise = await Exercise.create({
        name, 
        times, 
        imageIdx
    });

    res.json(exercise);

});

export const updateExercise = asyncHandler(async (req, res) => {
    const { name, times, imageIndex, exerciseId } = req.body;

    const exercise = await Exercise.findById(exerciseId);

    if(!exercise) {
        res.status(404);
        throw new Error('Данное упражнение не найдено');
    };

    exercise.name = name;
    exercise.times = times;
    exercise.imageIdx = imageIndex;

    let updatedExercise = await exercise.save();

    res.json(updatedExercise);
});

export const deleteExercise = asyncHandler(async (req, res) => {
    const { exerciseId } = req.body;

    const exercise = await Exercise.findById(exerciseId);

    if(!exercise) {
        res.status(404);
        throw new Error('Данное упражнение не найдено');
    };

    exercise.remove()

    res.json({
        message: 'Exercise has been deleted'
    });
});

export const getExercises = asyncHandler(async (req, res) => {
    const exercises = await Exercise.find({});

    res.json(exercises);
});