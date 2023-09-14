import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    public authService: AuthService
  ){}

  login(name:string,password:string)
  {
    this.authService.SignIn(name,password)
  }

}
