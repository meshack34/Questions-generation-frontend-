import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  first_name: string = '';
  last_name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onRegister(): void {
    const registerData = {
      first_name: this.first_name,
      last_name: this.last_name,
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.authService.register(registerData).subscribe(
      data => {
        console.log('Registration successful', data);
        // Handle successful registration, e.g., navigate to login
      },
      err => {
        console.error('Registration failed', err);
      }
    );
  }
}
