import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8000/api'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  generateSimpleQuestions(textContent: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-simple-questions/`, { textContent });
  }

  generateMultipleChoiceQuestions(textContent: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/generate-multiple-choice-questions/`, { textContent });
  }
}
