import { NextFunction, Request, Response } from 'express';
import IService from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarController {
  constructor(private _service: IService<ICar>) {}

  public async create(req: Request, res: Response<ICar>, next: NextFunction) {
    try {
      const data = req.body;
      const result = await this._service.create(data);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async read(req: Request, res: Response<ICar[]>, next: NextFunction) {
    try {
      const cars = await this._service.read();
      return res.status(200).json(cars);
    } catch (err) {
      next(err);
    }
  }

  public async readOne(req: Request, res: Response<ICar>, next: NextFunction) {
    try {
      const { id } = req.params;
      const car = await this._service.readOne(id) as unknown as ICar;
      return res.status(200).json(car);
    } catch (err) {
      next(err);
    }
  }

  public async update(req: Request, res: Response<ICar>, next: NextFunction) {
    try {
      const data = req.body;
      const { id } = req.params;
      const result = await this._service.update(id, data) as unknown as ICar;
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async delete(req: Request, res: Response<ICar>, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this._service.delete(id) as unknown as ICar;
      return res.status(204).json(result);
    } catch (err) {
      next(err);
    }
  }
}