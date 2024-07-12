// auth.service.ts
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
      tap(() => this.router.navigate(['/home']))
    );
  }

  getUserDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-detail/`);
  }

  logout() {
    // Clear token from localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    // Optional: Implement any other logout logic, e.g., redirecting to login page
  }

  get loggedIn(): boolean {
    // Check if token exists in localStorage
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false; // Return false if localStorage is not available (e.g., SSR)
  }
}



