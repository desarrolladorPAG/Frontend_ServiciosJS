import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginService } from 'src/app/servicios/login/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {
  token: any = null;
  mensaje: any = null

  constructor(private route: ActivatedRoute, private loginService : LoginService, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
    this.verificar_correo()
  }

  verificar_correo(){
    if (this.token == null){
      this.mensaje = "Error al verificar correo, intente de nuevo";
    }

    this.loginService.verificarCorreo(this.token).subscribe({
      next : (data) => {
        this.mensaje = data.message;
      },
      error : (e: HttpErrorResponse) => {
        if (e.error.message){
          this.mensaje = e.error.message;
        } else {
          this.mensaje = "Ha ocurrido un error inesperado, intente de nuevo o comuniquese con el administrador"
        }
      }
    })
  }

  reenviarLinkDeVerificacion() {
    Swal.fire({
      title: "Ingrese su correo electrónico",
      input: "email",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Reenviar link de verificación",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: (correo) => {
        let user = {
          correo : correo
        }
        return this.loginService.reenviarLinkDeVerificacion(user).pipe(
          catchError(error => {
            Swal.showValidationMessage(error.error.message);
            return throwError(error);
          })
        ).toPromise();
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: result.value.message,
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
            
          }
        });;
      }
    });
  }

}
