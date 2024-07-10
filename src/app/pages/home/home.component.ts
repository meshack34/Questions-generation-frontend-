import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  textContent: string = '';

  constructor(private questionService: QuestionService) {}

  generateSimpleQuestions(): void {
    this.questionService.generateSimpleQuestions(this.textContent).subscribe(response => {
      console.log('Simple Questions:', response);
    });
  }

  generateMultipleChoiceQuestions(): void {
    this.questionService.generateMultipleChoiceQuestions(this.textContent).subscribe(response => {
      console.log('Multiple Choice Questions:', response);
    });
  }
}
