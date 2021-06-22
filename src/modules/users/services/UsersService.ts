import { FilterQuery } from 'mongoose';
import bcrypt from 'bcrypt';
import UsersRepository from '../repositories/UsersRepository';
import IUsersModel from '../models/UsersModel';
import IOptionsRetrieveModel from '../../../helpers/lib/repositories/models/OptionsRetrieveModel';
import IFiltersModel from '../models/FiltersModel';
import UtilsService from '../../../helpers/utils/UtilsService';
import KeyValueObject from '../../../helpers/interfaces/KeyValueObject';
import MatchAggregationUser from '../interfaces/MatchAggregation';
import FiltersUser, { ListObjectUser } from '../interfaces/FiltersUser';

class UtilisateurService {
  private _utilisateursRepository: UsersRepository;

  constructor() {
    this._utilisateursRepository = new UsersRepository();
  }

  retrieve(options: IOptionsRetrieveModel, params: IFiltersModel): Promise<IUsersModel[]> {
    return this._utilisateursRepository.retrieve(options, params);
  }

  aggregate(pipeline: unknown[]): Promise<IUsersModel[]> {
    return this._utilisateursRepository.aggregate(pipeline);
  }

  create(item: IUsersModel): Promise<IUsersModel> {
    return this._utilisateursRepository.create(item);
  }

  update(_id: string, item: IUsersModel): Promise<IUsersModel> {
    return this._utilisateursRepository.update(_id, item);
  }

  delete(_id: string): Promise<IUsersModel> {
    return this._utilisateursRepository.delete(_id);
  }

  findById(_id: string, projection?: { [key: string]: number }): Promise<IUsersModel> {
    return this._utilisateursRepository.findById(_id, projection);
  }

  count(
    params: FilterQuery<IUsersModel>,
  ): Promise<number> {
    return this._utilisateursRepository.count(params);
  }

  buildMatchQuery(filters: FiltersUser): MatchAggregationUser {
    let match: MatchAggregationUser = {};
    if (filters.search) {
      match.$or = [
        'username',
        'email',
        'firstname',
        'lastname',
      ].map((filter) => UtilsService.getMatchByRegex(filter, filters.search));
    }
    const availableFilters: ListObjectUser[] = ['username', 'email', 'firstname', 'lastname'];
    availableFilters.forEach((filter: ListObjectUser) => {
      if (filters[filter]) {
        match = { ...match, ...UtilsService.getMatchByRegex(filter, filters[filter]) };
      }
    });
    if (filters.role) {
      match = { ...match, role: { $in: filters.role.split('|') } };
    }
    return match;
  }

  public static async loginUser(username: string, password: string): Promise<IUsersModel | null> {
    const service = new UtilisateurService();
    const match = {
      $or: [
        'username',
        'email',
      ].map((filter) => UtilsService.getMatchByRegex(filter, username)),
    };
    const [user] = await service.aggregate([{ $match: match }]);
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        return user;
      }
    }
    return null;
  }

  public async generateHashedPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }
}

Object.seal(UtilisateurService);
export = UtilisateurService;
