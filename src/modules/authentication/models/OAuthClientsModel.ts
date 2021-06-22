import { Document } from 'mongoose';

export interface OAuthClientsModel extends Document {
    clientId: string;
    clientSecret: string;
    redirectUris: string[];
    grants: string[];
}

export default OAuthClientsModel;
