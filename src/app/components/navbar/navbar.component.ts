import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Optional: Initialization logic
  }

  logout() {
    this.authService.logout(); // Call logout method in AuthService
    this.router.navigate(['/login']); // Navigate to login page
  }
}
