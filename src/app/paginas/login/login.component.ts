import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Usuario } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/servicios/login/login.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthGoogleService } from 'src/app/servicios/auth-google/auth-google.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loading: boolean = false;

  constructor(private fb : FormBuilder, private loginService : LoginService, private authGoogleService : AuthGoogleService){}

  ngOnInit(): void {
    
    // Logica para animacion de login
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".contenedor");

    if (sign_up_btn && sign_in_btn && container) {
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    }
  }

  form_login : FormGroup = this.fb.group({
    correo : this.fb.control('', [Validators.required, Validators.email
    ]),
    password: this.fb.control('', [Validators.required])
  });

  login(value: any){
    this.submitted = true;

    if(this.form_login.valid){
      //Body que se enviara al backned
      const usuario: Usuario = {
        correo: value.correo,
        password: value.password
      };

      this.loading = true;
      this.loginService.login(usuario).subscribe({
        next : (data) =>  {
          this.loading = false;
          localStorage.setItem('token', data.token);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido',
            allowOutsideClick : false
          }).then((result) => {
            if (result.isConfirmed) {
              
            }
          });
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          if (e.error.message){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: e.error.message,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error inesperado",
            });

          }

          
        }
      })
    }
  }

  loginGoogle(){
    this.authGoogleService.login();
  }


  
  


  
}
