import { FilterQuery } from 'mongoose';

import mongoose = require('mongoose');
import IRead = require('../common/Read');
import IWrite = require('../common/Write');

import IOptionsRetrieveModel = require('../models/OptionsRetrieveModel');

class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {
  private _model: mongoose.Model<T>;

  constructor(schemaModel: mongoose.Model<T>) {
    this._model = schemaModel;
  }

  create(item: T): Promise<T> {
    return this._model.create(item) as Promise<T>;
  }

  retrieve(
    options: IOptionsRetrieveModel,
    params = {},
  ): Promise<T[]> {
    return this._model.find(params, null, options).exec() as Promise<T[]>;
  }

  aggregate(
    params: unknown[],
  ): Promise<T[]> {
    return this._model.aggregate(params).exec() as Promise<T[]>;
  }

  update(_id: string, item: T): Promise<T> {
    return this._model.updateOne(
      { _id: RepositoryBase.toObjectId(_id) } as any,
      item as any,
      { new: true },
    ).exec() as Promise<T>;
  }

  delete(_id: string): Promise<T> {
    return this._model.findOneAndDelete({ _id: RepositoryBase.toObjectId(_id) } as any)
      .exec() as Promise<T>;
  }

  findById(_id: string, projection?: { [key: string]: number }): Promise<T> {
    return this._model.findById(_id, projection).exec() as Promise<T>;
  }

  count(
    params: FilterQuery<T>,
  ): Promise<number> {
    return this._model.countDocuments(params).exec();
  }

  static toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }
}

export = RepositoryBase;
