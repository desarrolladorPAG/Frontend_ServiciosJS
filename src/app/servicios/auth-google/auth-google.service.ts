import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private oAuthService: OAuthService, private http: HttpClient) {
    this.initLogin()
   }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: environment.clientId,
      redirectUri: window.location.origin + '/main',
      scope: 'openid profile email'
    }
    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh()
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oAuthService.initLoginFlow();
  }

  login_google() : Observable<any>{
    const tokenid = sessionStorage.getItem('id_token'); // obtengo el id token de google
    return this.http.post(`${this.url}login_google`,{token_google : tokenid})
  }

  logout() {
    this.oAuthService.logOut()
  }

  getProfile(){
    return this.oAuthService.getIdentityClaims()
   }


}
