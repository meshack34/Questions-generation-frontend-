

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, user).pipe(
      tap(() => this.router.navigate(['/login']))
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Store token upon successful login
        this.router.navigate(['/home']); // Navigate to authenticated route
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Clear token on logout
    this.router.navigate(['/login']); // Navigate to login page
  }

  loggedIn(): boolean {
    // Check if token exists in localStorage
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false; // Return false if localStorage is not available (e.g., SSR)
  }
}
