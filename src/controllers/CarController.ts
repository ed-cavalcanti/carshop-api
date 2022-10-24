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
}