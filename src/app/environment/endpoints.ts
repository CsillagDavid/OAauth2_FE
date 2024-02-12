export const endpoints = {
    facebook: {
        baseUrl: 'https://www.facebook.com',
        login: 'v18.0/dialog/oauth'
    },
    google: {
        login: 'google/login',
        signup: 'google/signup',
        getUserInformations: 'google/userInformations',
        loginWithOauth2: 'google/loginWithOauth2'
    },
    client: {
        recieveFacebookToken: 'recieveFacebookToken',
    },
    auth: {
        logout: "auth/logout"
    }
}