import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment} from "../../environment/environment";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
	@Input() error: string | undefined;
	@Output() submitEM = new EventEmitter();

	form: FormGroup = new FormGroup({
		username: new FormControl(''),
		password: new FormControl(''),
	});

	constructor(private authService: AuthService){}

	ngOnInit(): void {
        //https://www.youtube.com/watch?v=G4BBNq1tgwE&ab_channel=IsraelQuiroz
        // @ts-ignore
        window.onGoogleLibraryLoad = () => {
            // @ts-ignore
            google.accounts.id.initialize({
                client_id: environment.oauth.google.clientId,
                callback: this.handleCredentialResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside : true
            });
        // @ts-ignore
        google.accounts.id.renderButton(
        // @ts-ignore
            document.getElementById('googleLoginButtonDiv'),
            {theme: "outline", size: "large", width: "100%"}
        );
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {});
		};
    }

    async handleCredentialResponse(response: CredentialResponse) {
        await this.authService.googleLogin(response.credential)
			.subscribe(response => {
				// localStorage.setItem("token", response.token);
				console.log(response);
			},
			(error: any) => {
				console.log(error);
			});
    }

	facebookLogin(){
		this.authService.fbLogin();
	}

	submit() {
		if (this.form.valid) {
			this.submitEM.emit(this.form.value);
		}
	}
}
