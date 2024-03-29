import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from "../../environment/environment";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	@Input() error: string | undefined;
	@Output() submitEM = new EventEmitter();

	form: FormGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
	});

	authenticateTimeout: NodeJS.Timeout | undefined;

	constructor(private authService: AuthService,
		private snackBar: MatSnackBar,
		private router: Router) { }

	ngOnInit(): void {
		//https://www.youtube.com/watch?v=G4BBNq1tgwE&ab_channel=IsraelQuiroz
		// @ts-ignore
		window.onGoogleLibraryLoad = () => {
			// @ts-ignore
			google.accounts.id.initialize({
				client_id: environment.oauth.google.clientId,
				callback: this.handleCredentialResponse.bind(this),
				auto_select: false,
				cancel_on_tap_outside: true,

			});
			// @ts-ignore
			google.accounts.id.renderButton(
				// @ts-ignore
				document.getElementById('googleLoginButtonDiv'),
				{ theme: "outline", size: "large", width: "100%" }
			);
			// @ts-ignore
			google.accounts.id.prompt((notification: PromptMomentNotification) => { });
		};
	}

	async handleCredentialResponse(credentialResponse: CredentialResponse) {
		this.saveCredentialResponse(credentialResponse);

		this.authService.googleLogin(credentialResponse.credential)
			.subscribe((response) => {
				console.log(response);
				console.log(response.token);
				localStorage.setItem(environment.localStorage.token, response.token);
				localStorage.setItem(environment.localStorage.userInformations, response.userInformation);
				this.startAuthenticateTimer();
				this.router.navigate(['/']);
			},
				(error: any) => {
					console.log(error);
					this.snackBar.open(error.error, "Close", { duration: 5000 });
				});
	}
	saveCredentialResponse(credentialResponse: CredentialResponse) {
		localStorage.setItem(environment.localStorage.credentialResponse, JSON.stringify(credentialResponse));
	}

	facebookLogin() {
		this.authService.fbLogin();
	}

	submit() {
		if (this.form.valid) {
			this.submitEM.emit(this.form.value);
		}
	}

	private startAuthenticateTimer() {
		const helper = new JwtHelperService();
		const token = localStorage.getItem(environment.localStorage.token) || '';
		const tokenExp = helper.decodeToken(token).exp;
		console.log(token);
		const expires = new Date(tokenExp * 1000);
		const timeout = expires.getTime() - Date.now() - (60 * 1000);
		console.log("authenticateTimeout created with: " + timeout);
		this.authenticateTimeout = setTimeout(() => {
			console.log("timeoutReached");
			this.authService.logOut();
		}, timeout);
	}
}
