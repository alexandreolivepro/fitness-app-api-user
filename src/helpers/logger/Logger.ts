import moment from 'moment';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
type EsType = 'IHM' | 'BATCH' | 'WS_PROVIDER';
type ESEnvironnement = 'dev' | 'recf' | 'int' | 'pprod' | 'prod';

export interface ConfigLog {
    // Nom de l'application.
    applicationName: string;
    // Code de l'application.
    applicationCode: string;
    // Environnement : nom de l'environnement (recette, production, etc )
    environnement: ESEnvironnement;
    // Systeme sur lequel  tourne l'application.
    system: string;
    // Type d'application loguée. Valeurs posssibles : IHM, BATCH, WS_PROVIDER.
    type: EsType;
  }

  interface Log extends ConfigLog {
    // Date du message au format Mois(anglais) DDth YYYY, hh:mm:ss
    // (format de date pour la base de données d’elasticSearch)
    dateTime: string;
    // Niveau de log : DEBUG / INFO / WARN / ERROR
    loglevel: LogLevel;
    // Message de log.
    logmessage: string;
  }

export class Logger {
  readonly logLevel: string[] = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

  readonly esType: string[] = ['IHM', 'BATCH', 'WS_PROVIDER'];

  readonly esEnv: string[] = ['dev', 'recf', 'int', 'pprod', 'prod'];

  private _config!: ConfigLog;

  constructor(config: ConfigLog) {
    this.config = config;
  }

  /**
   * Cette méthode trigger un console log formatté au format Malakoff Humanis
   * les console.log seront récupéré par Kibana si bien formatté
   * @param logLevel {LogLevel}
   * @param logMessage {string}
   */
  log(logLevel: LogLevel, logMessage: string): void {
    if (this.logLevel.indexOf(logLevel) === -1) {
      throw new Error(`${logLevel} n'est un niveau de log accepté (possibilité: DEBUG,`
        + ' INFO, WARN, ERROR)');
    }
    /* eslint-disable-next-line */
    console.log(this.formatInfo(logLevel, logMessage));
  }

  /**
   * Cette méthode va ajouté les informations de l'application et
   * @param loglevel {LogLevel} Le niveau d'importance du message ('DEBUG'| 'INFO'| 'WARN'| 'ERROR')
   * @param logmessage {string} Le message à loggé
   * @returns {Log} Retourne le message formatté avec toutes les informations nécessaires
   */
  formatInfo(loglevel: LogLevel, logmessage: string): Log {
    return {
      loglevel,
      logmessage,
      dateTime: moment().format(),
      ...this.config,
    };
  }

  private set config(config: ConfigLog) {
    if (!config.applicationName) {
      throw new Error('applicationName est manquant dans la configuration');
    }
    if (!config.applicationCode) {
      throw new Error('applicationCode est manquant dans la configuration');
    }
    if (!config.environnement) {
      throw new Error('environnement est manquant dans la configuration');
    }
    if (!config.system) {
      throw new Error('system est manquant dans la configuration');
    }
    if (!config.type) {
      throw new Error('type est manquant dans la configuration');
    }
    if (this.esEnv.indexOf(config.environnement) === -1) {
      throw new Error(`${config.environnement} n'est un environnement accepté `
        + '(possibilité: dev, recf, int, pprod, prod)');
    }
    if (this.esType.indexOf(config.type) === -1) {
      throw new Error(`${config.type} n'est un type accepté (possibilité: `
        + 'IHM, BATCH, WS_PROVIDER');
    }
    this._config = config;
  }

  private get config(): ConfigLog {
    return this._config;
  }
}
