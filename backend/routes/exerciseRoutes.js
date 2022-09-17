import express from "express";
import { addNewExercise, getExercises, updateExercise } from "../controllers/exercise/mainController.js"
import { addNewExerciseLog, getExerciseLog, updateCompletedExerciseLog, updateExerciseLog } from "../controllers/exercise/logController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/').post(protect, addNewExercise);
router.route('/').get(protect, getExercises);
router.route('/').put(protect, updateExercise);
router.route('/log').post(protect, addNewExerciseLog);
router.route('/log').put(protect, updateExerciseLog);
router.route('/log/completed').put(protect, updateCompletedExerciseLog);
router.route('/log/:id').get(protect, getExerciseLog);
router.route('/log').put(protect, getExerciseLog);


export default router;