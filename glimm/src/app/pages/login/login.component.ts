import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(public authService: AuthService, public router:Router){}

  onSubmit() {
    this.authService.SignIn(this.authService.fsAuth,this.email, this.password)
    this.router.navigate(['/dashboard']);
  }

}
