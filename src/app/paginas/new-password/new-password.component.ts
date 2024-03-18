import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { New_password } from 'src/app/interfaces/usuario';
import { LoginService } from 'src/app/servicios/login/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  submitted : boolean = false;
  token: any = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private loginService : LoginService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  form_new_password : FormGroup  = this.fb.group({
    password : this.fb.control('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    confirm_password: this.fb.control('', [Validators.required])
  }, {
    validators: this.passwordMatchValidator
  });

  //Funcion para validar de que las contraseñas sean iguales en los campos
  passwordMatchValidator(control: AbstractControl){
    return control.get('password')?.value === control.get('confirm_password')?.value? null: {mismatch: true};
  }

  crearPassword(value : any){
    this.submitted = true;

    if(this.form_new_password.valid){
      this.submitted = false;

      const new_password : New_password = {
        password : value.password,
        confirm_password : value.confirm_password
      }

      this.loginService.new_password(this.token, new_password).subscribe({
        next : (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada',
            text: data.message,
            allowOutsideClick : false
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        },
        error : (e: HttpErrorResponse) => {
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
              text: "Error inesperado, intente de nuevo o comuniquese con el administrador",
            });

          }
        }
      })


    }

  }

}
