import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

//middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Config
import { connectDB } from '../backend/config/db.js'

// Routes
import userRouter from './routes/userRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js'

dotenv.config();
connectDB();

const app = express();

if(process.env.NODE_ENV === "DEVELOPMENT")
 app.use(morgan('dev'));

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/workouts', workoutRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
    PORT,
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);