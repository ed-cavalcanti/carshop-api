import { Router } from 'express';
import CarModel from '../models/Car';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const carRoute = Router();

const carModel = new CarModel();
const carService = new CarService(carModel);
const carController = new CarController(carService);

carRoute.get('/cars/:id', (req, res, next) => carController.readOne(req, res, next));
carRoute.put('/cars/:id', (req, res, next) => carController.update(req, res, next));
carRoute.delete('/cars/:id', (req, res, next) => carController.delete(req, res, next));
carRoute.get('/cars', (req, res, next) => carController.read(req, res, next));
carRoute.post('/cars', (req, res, next) => carController.create(req, res, next));

export default carRoute;
