import KeyValueObject from '../interfaces/KeyValueObject';
import { PaginationInfo } from '../interfaces/PaginationInfo';

export default class UtilsService {
  public static getSortForPipeline(defaultKey: string, sortBy?: string): { [key: string]: number } {
    let sort: { [x: string]: number } = {
      [defaultKey]: 1,
    };
    // Trier les retours
    if (sortBy) {
      const tempSort = sortBy as string;
      sort = {
        [tempSort.split(' ')[0]]: tempSort.split(' ')[1] === 'ASC' ? 1 : -1,
      };
    }
    return sort;
  }

  public static getMatchByRegex(key: string, value: string): { [key: string]: { $in: RegExp[] } } {
    return {
      [key]: {
        $in: [new RegExp(value, 'i')],
      },
    };
  }

  public static buildPagination(count: number, index: number, limit: number): PaginationInfo {
    return {
      previous: index !== 0,
      next: index + limit < count,
      count,
    };
  }
}
