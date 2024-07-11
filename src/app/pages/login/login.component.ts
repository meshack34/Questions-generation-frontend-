import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onLogin(): void {
    const loginData = { email: this.email, password: this.password };
    this.authService.login(loginData).subscribe(
      data => {
        console.log('Login successful', data);
        localStorage.setItem('access_token', data.access);
        // Handle successful login, e.g., navigate to home
      },
      err => {
        console.error('Login failed', err);
      }
    );
  }
}
