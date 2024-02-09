import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CredentialResponse } from 'google-one-tap';
import { environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
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
				cancel_on_tap_outside: true
			});
			// @ts-ignore
			google.accounts.id.renderButton(
				// @ts-ignore
				document.getElementById('googleSignupButtonDiv'),
				{ theme: "outline", size: "large", width: "100%", text: "continue_with" }
			);
			// @ts-ignore
			google.accounts.id.prompt((notification: PromptMomentNotification) => { });
		};
	}

	async handleCredentialResponse(credentialResponse: CredentialResponse) {
		await this.authService.googleSignup(credentialResponse.credential)
			.subscribe(response => {
				localStorage.setItem(environment.localStorage.token, response.token);
				localStorage.setItem('userInformation', response.userInformation);
				this.startAuthenticateTimer();
				this.router.navigate(['/']);
			},
				(error: any) => {
					this.snackBar.open(error);
				});
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
