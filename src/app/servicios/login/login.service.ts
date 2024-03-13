import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registrar_usuario, Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';
import { AuthGoogleService } from '../auth-google/auth-google.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url ='http://127.0.0.1:5000/api/v1/';

  constructor(private http: HttpClient, private authGoogleService : AuthGoogleService) { }

  login(usuario : Usuario):Observable<any>{
    return this.http.post(`${this.url}login`,usuario);
  }

  loginGoogle(){
    this.authGoogleService.login();
  }

  registrar_usuario(registrar_usuario : Registrar_usuario):Observable<any>{
    return this.http.post(`${this.url}registro`,registrar_usuario);
  }

}
