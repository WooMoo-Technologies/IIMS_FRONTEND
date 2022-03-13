import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  hide = true;
  error = '';

  constructor(private authenticationService:LoginService) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });
  }

  signIn() {
    console.log("login")
    this.authenticationService.login(this.LoginForm.get('username')?.value,this.LoginForm.get('password')?.value)
  }
}
