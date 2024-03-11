import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from 'src/app/servicios/auth-google/auth-google.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  loading : boolean = false;

  constructor(private authGoogleService : AuthGoogleService, private router : Router){}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      if (sessionStorage.getItem('id_token')){
        this.validateAccess();
      } 
    } , 1500);
  }


  validateAccess(){
    this.authGoogleService.login_google().subscribe({
      next : (data) => {
        this.loading = false;
        localStorage.setItem('token', data.token);
      },
      error : error => {
        this.loading = false;
        this.logout()
      }
    })
  }

  logout(){
    this.authGoogleService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

}
