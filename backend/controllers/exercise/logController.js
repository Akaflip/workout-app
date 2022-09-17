import ExerciseLog from "../../models/exerciseLogModel.js";
import asyncHandler from 'express-async-handler';
import { reBuildTimes } from "../../helpers/exerciseLog.js";

export const addNewExerciseLog = asyncHandler(async (req, res) => {
    const {exerciseId, times} = req.body;

    let timesArray = [];

    const prevExercises = await ExerciseLog.find({user: req.user._id, exercise: exerciseId}).sort('desk');


    if(prevExercises[0]) {
        timesArray = prevExercises[0].times;
    } else {
        for(let i = 0; i < times; i++) {
            timesArray.push({
                weight: 0,
                repeat: 0,
            })
        };
    }
   

    const exerciseLog = await ExerciseLog.create({
        user: req.user._id,
        exercise: exerciseId,
        times: timesArray

    });

    res.json(exerciseLog);

});

export const getExerciseLog = asyncHandler(async (req, res) => {
    const exerciseLog = await ExerciseLog.findById(req.params.id)
    .populate('exercise', 'name imageId')
    .lean();


    if (!exerciseLog) {
        res.status(404);
        throw new Error('Данный лог не найден!');
    };

    const prevExerciseLogs = await ExerciseLog.find({
        user: req.user._id,
        exercise: exerciseLog._id
    }).sort('desc');

    const prevExLog = prevExerciseLogs[0]

    let newTimes = reBuildTimes(exerciseLog);

    if(prevExLog) newTimes = reBuildTimes(exerciseLog, prevExLog);

    res.json({
        ...exerciseLog,
        times: newTimes
    });
});

export const updateExerciseLog = asyncHandler(async (req, res) => {
    const { logId, timeIndex, key, value } = req.body;

    const currentLog = await ExerciseLog.findById(logId);

    if (!currentLog) {
        res.status(404);
        throw new Error('Данный лог не найден!');
    };

    let newTimes = currentLog.times;

    if(!timeIndex || !key || !value) {
        res.status(404);
        throw new Error('Вы не указали все поля!');
    };

    newTimes[timeIndex][key] = value;

    currentLog.times = newTimes;

    const updatedLog = await currentLog.save();

    res.json(updatedLog);
});

export const updateCompletedExerciseLog = asyncHandler(async (req, res) => {
    const { logId, completed } = req.body;

    const currentLog = await ExerciseLog.findById(logId);

    if (!currentLog) {
        res.status(404);
        throw new Error('Данный лог не найден!');
    };

    currentLog.completed = completed;

    const updatedLog = await currentLog.save();

    res.json(updatedLog);
});