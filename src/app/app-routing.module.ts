import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { environment } from './environment/environment';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthorizationGrantPageComponent } from './pages/authorization-grant-page/authorization-grant-page.component';
import { AuthGuard } from './auth.guard';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LogoutPageComponent } from './pages/logout/logout-page.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'signup', component: SignupPageComponent },
	{ path: 'logout', component: LogoutPageComponent },
	// { path: `${environment.oauth.facebook.redirectUri}`, pathMatch: 'full', component: AuthorizationGrantPageComponent },
	// { path: 'home', component: HomeComponent }
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }