import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../environment/environment";
import { Observable } from 'rxjs';
import { CredentialResponse } from 'google-one-tap';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    private base = environment.apiBaseUrl;
    private endpoints = environment.endpoints;
    private clientId = environment.oauth.facebook.clientId;
    private responseType = environment.oauth.facebook.responseType;
    private redirectUri = environment.oauth.facebook.redirectUri;
    private scope = environment.oauth.facebook.scope;

    constructor(private httpClient: HttpClient,
        private router: Router) { }

    fbLogin() {
        window.location.href = `${this.endpoints.facebook.baseUrl}/${this.endpoints.facebook.login}?client_id=${this.clientId}&response_type=${this.responseType}&redirect_uri=${this.base}/${this.redirectUri}&scope=${this.scope}`;
    }

    get(url: string): Observable<any> {
        return this.httpClient
            .get<Observable<any>>(url);
    }

    logOut(){
        var token = localStorage.getItem(environment.localStorage.token);
        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.httpClient
            .post<Observable<any>>(`${this.base}/${this.endpoints.auth.logout}`, JSON.stringify(token), { headers: header })
            .subscribe(
                response => {
                    console.log(response);
                    localStorage.removeItem(environment.localStorage.token);
                    localStorage.removeItem(environment.localStorage.credentialResponse);
                    localStorage.removeItem(environment.localStorage.userInformations);
                    this.router.navigate(["/login"]);
                }
            );
    }

    googleLogin(credential: string): Observable<any> {
        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.httpClient
            .post<Observable<any>>(`${this.base}/${this.endpoints.google.login}`, JSON.stringify(credential), { headers: header });
    }

    googleSignup(credential: string): Observable<any> {
        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.httpClient
            .post<Observable<any>>(`${this.base}/${this.endpoints.google.signup}`, JSON.stringify(credential), { headers: header });
    }

    logedIn(): boolean {
        const helper = new JwtHelperService();
        const token = localStorage.getItem(environment.localStorage.token);
        console.log(helper, token, !!token && !helper.isTokenExpired(token));
        return !!token && !helper.isTokenExpired(token);
    }

    getInformations(response: CredentialResponse): Observable<any> {
        return this.httpClient
            .get<Observable<any>>("https://www.googleapis.com/plus/v1/people/me?access_token=" + response.credential);
    }
}