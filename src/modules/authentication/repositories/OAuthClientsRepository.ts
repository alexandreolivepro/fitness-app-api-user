import { Query } from 'mongoose';
import OAuthClientsModel from '../models/OAuthClientsModel';
import OAuthClientsSchema from '../schemas/OAuthClients';
import RepositoryBase from '../../../helpers/lib/repositories/base/RepositoryBase';

class OAuthClientsRepository extends RepositoryBase<OAuthClientsModel> {
  constructor() {
    super(OAuthClientsSchema);
  }

  public static getClient(clientId: string, clientSecret: string): Query<OAuthClientsModel, OAuthClientsModel> {
    return OAuthClientsSchema.findOne({ clientId, clientSecret }).lean();
  }
}

Object.seal(OAuthClientsRepository);
export = OAuthClientsRepository;
