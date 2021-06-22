import Constants from '../../config/constants/Constants';
import Message from './interfaces/Message';
import ApiError from './interfaces/ApiError';
import Severite from './interfaces/Severite';

export default class StatusAPI {
  messages: Message[] = [];

  /**
     * Ajoute un message d'erreur à la liste de message d'erreur pour les renvoyer
     * tous d'un
     * @param code Le code erreur applicatif
     * @param message Le message décrivant l'erreur
     * @param detail Un objet pour passer plus d'information
     */
  addMessage(code: string, severite: Severite, libelle: string, details?: string): void {
    this.messages.push({
      code,
      libelle,
      severite,
      details,
      idAppliOrigine: Constants.CODE_APPLICATION,
    });
  }

  /**
     * Return the list of error formatted.
     * @returns {ApiError}
     */
  returnStatus(): ApiError {
    return {
      status: {
        messages: this.messages,
      },
    };
  }
}
