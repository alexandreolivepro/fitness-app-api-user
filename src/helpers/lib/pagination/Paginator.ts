import IRangePagination = require('./interfaces/RangePagination');
import IResponsePagination = require('./interfaces/ResponsePagination');

class Paginator {
  /** Création de la pagination pour la réponse express
   * @param  {IRangePagination} range Range index - limit de la requête
   * @param  {number} collectionCount Nombres d'items dans la collection
   * @returns IResponsePagination
   */
  paginationStatus = (range: IRangePagination, collectionCount: number): IResponsePagination => {
    if (range.index < collectionCount) {
      const pagination: IResponsePagination = {
        precedent: null,
        suivant: null,
        total: collectionCount,
      };

      if (range.index !== 0) {
        pagination.precedent = true;
      } else {
        pagination.precedent = false;
      }

      if ((range.index + +range.limite) < collectionCount) {
        pagination.suivant = true;
      } else {
        pagination.suivant = false;
      }

      return pagination;
    }
    return null;
  }
}

export = Paginator;
