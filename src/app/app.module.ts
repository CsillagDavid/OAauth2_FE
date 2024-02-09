import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './services/auth.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthorizationGrantPageComponent } from './pages/authorization-grant-page/authorization-grant-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/user.service';
import { SignupComponent } from './components/signup/signup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { LogoutPageComponent } from './pages/logout/logout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginPageComponent,
    HomePageComponent,
    AuthorizationGrantPageComponent,
    HeaderComponent,
    SignupComponent,
    SignupPageComponent,
    LogoutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
