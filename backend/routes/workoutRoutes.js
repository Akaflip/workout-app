import express from "express";
import { addNewWorkout, getWorkout } from "../controllers/workout/workoutController.js"
import { addNewWorkoutLog } from "../controllers/workout/workoutLogController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/').post(protect, addNewWorkout);
router.route('/log').post(protect, addNewWorkoutLog);
router.route('/:id').get(protect, getWorkout);

export default router;