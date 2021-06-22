import IUsersModel = require('../models/UsersModel');
import UsersSchema = require('../schemas/UsersSchema');
import RepositoryBase = require('../../../helpers/lib/repositories/base/RepositoryBase');

class UsersRepository extends RepositoryBase<IUsersModel> {
  constructor() {
    super(UsersSchema);
  }
}

Object.seal(UsersRepository);
export = UsersRepository;
