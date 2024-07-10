import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  register(username: string, password: string, confirmPassword: string, email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, { username, password, 'confirmPassword': confirmPassword, email });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login/`, { username, password });
  }
}
