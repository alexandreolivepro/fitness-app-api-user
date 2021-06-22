// declare module "express-swagger-generator";
import OAuthServer from 'express-oauth-server';
import MatchAggregationUser from '../modules/users/interfaces/MatchAggregation';

declare module 'express-serve-static-core' {
    export interface Express {
        oauth: OAuthServer;
    }
    export interface User {
        prenom?: string;
        nom?: string;
        email?: string;
        role?: string;
        dateCreation?: Date;
    }

    export interface Filters {
        [x: string]: string[];
    }

    export interface Sort {
        [x: string]: number;
    }

    export interface Pagination {
        index: number;
        limite?: number | string;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface Users { }

    export interface UsersModule {
        count?: number;
        match?: MatchAggregationUser;
    }

    export interface Request {
        users?: UsersModule;
    }
}
