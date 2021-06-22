import Read = require('../common/Read');
import Write = require('../common/Write');

interface BaseService<T> extends Read<T>, Write<T> {
}
export = BaseService;
