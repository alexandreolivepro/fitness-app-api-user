import IResponsePagination = require('./ResponsePagination');
import ISkipAndLimit = require('./SkipAndLimit');

interface RequestPagination {
  mongooseOptions: ISkipAndLimit;
  paginationAPI: IResponsePagination;
}

export = RequestPagination;
