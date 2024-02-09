import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/app/environment/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: environment.oauth.google.clientId
      });

      // @ts-ignore
      google.accounts.id.disableAutoSelect();
      // @ts-ignore
    };
  }
}
