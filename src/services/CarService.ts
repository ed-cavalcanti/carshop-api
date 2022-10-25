import { isValidObjectId } from 'mongoose';
import IService from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(id: string): Promise<ICar | null> {
    const idTest = isValidObjectId(id);
    if (!idTest) throw new Error(ErrorTypes.InvalidMongoId);
    const car = await this._car.readOne(id);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async update(id: string, obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const idTest = isValidObjectId(id);
    if (!idTest) throw new Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.update(id, parsed.data);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async delete(id: string): Promise<ICar> {
    const idTest = isValidObjectId(id);
    if (!idTest) throw new Error(ErrorTypes.InvalidMongoId);

    const car = await this._car.delete(id);

    if (!car) throw new Error(ErrorTypes.ObjectNotFound);

    return car;
  }
}

export default CarService;
