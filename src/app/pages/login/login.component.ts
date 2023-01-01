import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  loginInvalid: boolean = false;
  servicio;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) {
      this.servicio = authService;

    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.servicio.login(this.formLogin.value)
    .then(response => {
      this.router.navigate(['/home']);
    })
    .catch(error => {console.log(error); this.loginInvalid = true});
  }

  get f() {
    return this.formLogin.controls;
  }

}
