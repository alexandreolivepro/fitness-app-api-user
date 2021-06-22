import Severite from './Severite';

interface Message {
    idAppliOrigine: string;
    code: string;
    severite: Severite;
    libelle: string;
    details?: string;
}

export = Message;
