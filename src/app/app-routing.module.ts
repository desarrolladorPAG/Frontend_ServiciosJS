import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { MainComponent } from './paginas/main/main.component';
import { VerificarCorreoComponent } from './paginas/verificar-correo/verificar-correo.component';
import { NewPasswordComponent } from './paginas/new-password/new-password.component';

const routes: Routes = [
  {
    path:'',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path : "login",
    component : LoginComponent
  },
  {
    path: "main",
    component : MainComponent
  },
  {
    path: "verificar_correo/:token",
    component: VerificarCorreoComponent
  },
  {
    path: "new_password/:token",
    component: NewPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
