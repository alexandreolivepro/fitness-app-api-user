import IReadController = require('../common/ReadController');
import IWriteController = require('../common/WriteController');
import IBaseService = require('../../services/base/BaseService');

interface BaseController<T extends IBaseService<Record<string, unknown>>>
    extends IReadController, IWriteController {

}
export = BaseController;
