import OAuthTokensModel from '../models/OAuthTokensModel';
import OAuthTokensSchema from '../schemas/OAuthToken';
import RepositoryBase from '../../repositories/base/RepositoryBase';

class OAuthTokensRepository extends RepositoryBase<OAuthTokensModel> {
  constructor() {
    super(OAuthTokensSchema);
  }
}

Object.seal(OAuthTokensRepository);
export = OAuthTokensRepository;
