import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
    credentialResponse: string;
    userInformations: string | undefined;

    constructor(private userService: UserService) {
        this.credentialResponse = this.getFormatedCredentialResponse();
        this.userInformations = this.getFormatedUser();
    }
    getFormatedCredentialResponse(): string {
        var json = this.userService.getCredentialResponse();
        return this.formatJson(json);
    }

    getFormatedUser(): string {
        var json = this.userService.getUserInformations();
        return this.formatJson(json);
    }

    formatJson(json: string): string {
        return json
            .replaceAll(',"', ',\n\t\t"')
            .replaceAll('{"', '{\n\t\t"')
            .replaceAll('}', '\n\t}');
    }
}
