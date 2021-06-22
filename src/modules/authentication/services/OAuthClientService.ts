import { FilterQuery } from 'mongoose';

import OAuthClientsRepository from '../repositories/OAuthClientsRepository';
import OAuthClientsModel from '../models/OAuthClientsModel';
import IOptionsRetrieveModel = require('../../../helpers/lib/repositories/models/OptionsRetrieveModel');

class OAuthClientService {
  private _oAuthClientRepository: OAuthClientsRepository;

  constructor() {
    this._oAuthClientRepository = new OAuthClientsRepository();
  }

  retrieve(options: IOptionsRetrieveModel, params: Record<string, unknown>): Promise<OAuthClientsModel[]> {
    return this._oAuthClientRepository.retrieve(options, params);
  }

  create(item: OAuthClientsModel): Promise<OAuthClientsModel> {
    return this._oAuthClientRepository.create(item);
  }

  update(_id: string, item: OAuthClientsModel): Promise<OAuthClientsModel> {
    return this._oAuthClientRepository.update(_id, item);
  }

  delete(_id: string): Promise<OAuthClientsModel> {
    return this._oAuthClientRepository.delete(_id);
  }

  findById(_id: string): Promise<OAuthClientsModel> {
    return this._oAuthClientRepository.findById(_id);
  }

  count(
    params: FilterQuery<OAuthClientsModel>,
  ): Promise<number> {
    return this._oAuthClientRepository.count(params);
  }
}

Object.seal(OAuthClientService);
export = OAuthClientService;
