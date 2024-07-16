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
        console.log('Login response:', response); 
        localStorage.setItem('token', response.access); 
        localStorage.setItem('refresh', response.refresh); 
        this.router.navigate(['/home']); 
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Clear token on logout
    localStorage.removeItem('refresh'); // Clear refresh token on logout
    this.router.navigate(['/login']); // Navigate to login page
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null; // Return null if localStorage is not available (e.g., SSR)
  }

  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      return this.http.post(`${this.baseUrl}/refresh/`, { refresh }).pipe(
        tap((response: any) => {
          console.log('Token refreshed:', response); 
          localStorage.setItem('token', response.access); // Store new access token
        })
      );
    }
    return new Observable(observer => {
      observer.error('No refresh token available');
    });
  }

  loggedIn(): boolean {
    // Check if token exists in localStorage
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false; // Return false if localStorage is not available (e.g., SSR)
  }
}
