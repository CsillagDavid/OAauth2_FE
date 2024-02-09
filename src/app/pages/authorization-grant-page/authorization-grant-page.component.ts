import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacebookAccount } from 'src/app/models/account.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-authorization-grant-page',
	templateUrl: './authorization-grant-page.component.html',
	styleUrls: ['./authorization-grant-page.component.scss']
})
export class AuthorizationGrantPageComponent {
	accessToken: string = '';
	dataAccessExpirationTime: string = '';
	expiresIn: string = '';
	code: string = '';

	isButtonDisabled = true;
	recievedFacebookAccount: FacebookAccount | undefined;

	constructor(private route: ActivatedRoute,
		private authService: AuthService) {
		route.fragment.subscribe(x => {
			const params = new URLSearchParams(x ?? '');
			this.accessToken = params.get('access_token') ?? '';
			this.dataAccessExpirationTime = params.get('data_access_expiration_time') ?? '';
			this.expiresIn = params.get('expires_in') ?? '';
			const codeJson = `
				<b>methode:</b> 'GET',
				<b>url:</b> 'https://graph.facebook.com/v8.0/me',
				<b>queryParams:</b> {
					<b>access_token:</b> <span class="accessTokenSpan">${this.accessToken}</span>,
					<b>date_access_expiration_time:</b> ${this.dataAccessExpirationTime},
					<b>expires_in:</b> ${this.expiresIn}
				}`
				.replaceAll('\t\t', '')
				.replaceAll('\t', '    ');
			this.code = `${codeJson}`;

			this.isButtonDisabled = false;
		});
	}

	onPost() {
		this.authService
			.get(`https://graph.facebook.com/v8.0/me?access_token=${this.accessToken}&date_access_expiration_time=${this.dataAccessExpirationTime}&expires_in=${this.expiresIn}`)
			.subscribe(response => {
					console.log(response)
					this.recievedFacebookAccount = {
						id: response.id,
						name: response.name
					} as FacebookAccount;
				}
			);
	}
}