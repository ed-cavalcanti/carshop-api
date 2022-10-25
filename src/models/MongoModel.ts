import { Model } from 'mongoose';
import { IModel } from '../interfaces/IModel';

abstract class MongoModel<T> implements IModel<T> {
  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  create = async (obj: T): Promise<T> => this._model.create({ ...obj });

  read = async (): Promise<T[]> => this._model.find();

  readOne = async (id: string): Promise<T | null> => this._model.findById(id);

  update = async (id: string, obj: Partial<T>) =>
    this._model.findByIdAndUpdate(id, obj, { new: true });

  delete = async (_id: string): Promise<T | null> => this._model.findByIdAndDelete({ _id });
}

export default MongoModel;
