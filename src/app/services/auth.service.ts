import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    base = "localhost:4200";

    constructor(private http: HttpClient){}

    // logIn(request: LoginRequest): Observable<LoginResponse> {
    //     const suffix = !request.domainCode
    //         ? this.endpoint.localLogin
    //         : !request.sessionDateTime
    //             ? this.endpoint.login
    //             : this.endpoint.backdateLogin;
    //     return this.http.post<LoginResponse>(
    //         `${this.apiBaseUrl}/Auth/api/v4.1${suffix}`,
    //         request
    //     );
    // }
}