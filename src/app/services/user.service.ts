import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable()
export class UserService {

    constructor() { }

    getUserInformations(): any {
        return localStorage.getItem(environment.localStorage.userInformations) ?? "";
    }

    getCredentialResponse(): any {
        return localStorage.getItem(environment.localStorage.credentialResponse) ?? "";
    }
}