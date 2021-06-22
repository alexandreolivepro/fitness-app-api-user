import { Document } from 'mongoose';

interface OAuthTokensModel extends Document {
    accessToken: string;
    accessTokenExpiresAt: string;
    client: string;
    clientId: string;
    refreshToken: string;
    refreshTokenExpiresAt: string;
    user : string;
    userId: string;
    scope: string;
}

export default OAuthTokensModel;
