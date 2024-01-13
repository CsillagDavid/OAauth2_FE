import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../environment/environment";
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { CredentialResponse } from 'google-one-tap';

@Injectable()
export class AuthService {
    base = environment.apiBaseUrl;
    endpoints = environment.endpoints;
    clientId = environment.oauth.facebook.clientId;
    responseType = environment.oauth.facebook.responseType;
    redirectUri = environment.oauth.facebook.redirectUri;
    scope = environment.oauth.facebook.scope;

    constructor(private httpClient: HttpClient) { }

    fbLogin() {
        window.location.href = `${this.endpoints.facebook.baseUrl}/${this.endpoints.facebook.login}?client_id=${this.clientId}&response_type=${this.responseType}&redirect_uri=${this.base}/${this.redirectUri}&scope=${this.scope}`;
    }

    get(url: string): Observable<any> {
        return this.httpClient
            .get<Observable<any>>(url);
    }

    logOut(url: string): Observable<any> {
        console.log(url);
        return this.httpClient
            .delete<Observable<any>>(url);
    }

    googleLogin(credential: string): Observable<any> {
        const header = new HttpHeaders().set('Content-type', 'application/json');
        return this.httpClient
            .post<Observable<any>>(`${this.base}/${this.endpoints.google.login}`, JSON.stringify(credential), { headers: header });
    }

    logedIn(): boolean {
        const helper = new JwtHelperService();
        // const decodedToken = helper.decodeToken(myRawToken);
        return !!localStorage.getItem('token') && !helper.isTokenExpired(localStorage.getItem('token'));
    }

    getInformations(response: CredentialResponse): Observable<any> {
        return this.httpClient
            .get<Observable<any>>("https://www.googleapis.com/plus/v1/people/me?access_token=" + response.credential);
    }
}