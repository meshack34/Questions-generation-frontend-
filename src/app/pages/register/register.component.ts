import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match!');
      return;
    }

    this.authService.register(this.username, this.password, this.confirmPassword, this.email).subscribe(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('Registration error: ', error);
    });
  }
}
