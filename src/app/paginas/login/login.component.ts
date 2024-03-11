import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(private fb : FormBuilder){}

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

  login(){
    this.submitted = true;
  }


  
  


  
}
