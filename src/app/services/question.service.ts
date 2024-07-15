import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  generateQuestions(data: any): Observable<any> {
    let token = this.authService.getToken();
    console.log('Retrieved token:', token);

    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    return this.http.post(`${this.baseUrl}/generate-questions/`, data, { headers }).pipe(
      catchError(error => {
        if (error.status === 401 && error.error.detail === 'Given token not valid for any token type') {
          // Token is invalid or expired, try to refresh it
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              token = this.authService.getToken();
              console.log('New token:', token);
              const newHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
              return this.http.post(`${this.baseUrl}/generate-questions/`, data, { headers: newHeaders });
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
