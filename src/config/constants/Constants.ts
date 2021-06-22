import dotenv = require('dotenv');

dotenv.config();

declare type EsType = 'IHM' | 'BATCH' | 'WS_PROVIDER';
declare type ESEnvironnement = 'dev' | 'recf' | 'int' | 'pprod' | 'prod';

class Constants {
  static TITLE = process.env.TITRE;

  static DESCRIPTION = process.env.DESCRIPTION;

  static VERSION = process.env.VERSION;

  static URL_APP = process.env.URL_APP;

  static BASE_PATH = process.env.BASE_PATH;

  static CODE_APPLICATION = process.env.CODE_APPLICATION;

  static PORT = process.env.PORT;

  static MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

  static ENV = process.env.ENV;

  static LOG_CONF = {
    applicationName: process.env.ES_APPLICATION_NAME,
    applicationCode: process.env.ES_APPLICATION_CODE,
    environnement: process.env.ES_ENVIRONNEMENT as ESEnvironnement,
    system: process.env.ES_SYSTEM,
    type: process.env.ES_TYPE as EsType,
  };

  static DEFAULT_ROLE = process.env.DEFAULT_ROLE;

  static ROLE_OBJ_PATH = process.env.ROLE_OBJ_PATH;

  static ACL_PATH = process.env.ACL_PATH;

  static REQUEST_LIMIT = +process.env.REQUEST_LIMIT;
}

Object.seal(Constants);
export = Constants;
