import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    email = "";
    picture = "";

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        const helper = new JwtHelperService();
        const token = localStorage.getItem(environment.localStorage.token) ?? '';
        const decodedToken = helper.decodeToken(token);
        this.email = decodedToken.email;
        this.picture = decodedToken.picture;
        // @ts-ignore
		window.onGoogleLibraryLoad = () => {
			// @ts-ignore
			google.accounts.id.initialize({
                client_id: environment.oauth.google.clientId
            });
		};
    }

    onLogout() {
        //https://www.youtube.com/watch?v=G4BBNq1tgwE&ab_channel=IsraelQuiroz
        //https://developers.google.com/identity/gsi/web/guides/revoke
        //https://github.com/googleapis/google-api-php-client/issues/2226
        // @ts-ignore
        // google.accounts.id.revoke("dvid.csillag@gmail.com", done => {
        //     console.log(done);
        // });

        this.authService.logOut();
    }
}