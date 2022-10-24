import express from 'express';
import errorHandler from './middlewares/ErrorHandler';
import carRoute from './routes/car.routes';

const app = express();
app.use(express.json());
app.use(carRoute);
app.use(errorHandler);

export default app;
