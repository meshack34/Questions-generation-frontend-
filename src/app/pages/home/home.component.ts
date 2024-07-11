import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  text: string = '';
  questions: any[] = [];

  constructor(private questionService: QuestionService) { }

  onGenerateQuestions(): void {
    const requestData = { text: this.text, use_evaluator: true, num_questions: 10, answer_style: 'short' };
    this.questionService.generateQuestions(requestData).subscribe(
      data => {
        this.questions = data.questions;
      },
      err => {
        console.error('Question generation failed', err);
      }
    );
  }
}
