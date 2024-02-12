import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig, SocialUser } from 'angularx-social-login';
import { environment } from 'src/app/environment/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
    loginForm: FormGroup | undefined;
    socialUser!: SocialUser;
    isLoggedin: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        // init the react form object
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.route.queryParams.subscribe(params => {
            console.log(params['code']);
            let code = params['code'];
            if (code) {
                this.authService.googleLoginWithOauth2(code)
                .subscribe(x => {
                    console.log(x);
                });
            }
        });
    }
}
