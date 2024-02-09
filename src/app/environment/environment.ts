import {endpoints} from './endpoints';

export const environment = {
    endpoints: endpoints,
    apiBaseUrl: 'https://localhost:44359/api',
    JWTCookieName: 'JWToken',
    authCheckInterval: 5000,
    localStorage: {
        token: 'jwtToken',
        userInformations: "userInformations",
        credentialResponse: "credentialResponse",
    },
    oauth: {
        facebook: {
            clientId: '1192839698300926',
            responseType: 'token',
            redirectUri: 'oauth2/facebook/sign-in',
            scope: 'public_profile'
        },
        google: {
            clientId: '378632310994-f8rq01h518hplbi8d4tevioi6qc2v4bp.apps.googleusercontent.com',
        }
    },
};