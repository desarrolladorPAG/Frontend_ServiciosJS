import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { New_password, Registrar_usuario, Usuario } from 'src/app/interfaces/usuario';
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

  reenviarLinkDeVerificacion(correo : any):Observable<any>{
    return this.http.post(`${this.url}reenviar_link_verificacion`,correo);
  }

  verificarCorreo(token : any):Observable<any>{
    return this.http.post(`${this.url}verificar/${token}`, null);
  }

  recuperarPassword(correo : any):Observable<any>{
    return this.http.post(`${this.url}recuperar_password`,{correo : correo});
  }

  new_password(token : any, new_password : New_password):Observable<any>{
    return this.http.post(`${this.url}new_password/${token}`, new_password);
  }

  

}
