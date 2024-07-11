import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

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
    // Implementation of logout
  }

  get loggedIn(): boolean {
    // Implementation to check if user is logged in
    return !!localStorage.getItem('token');
  }
}
