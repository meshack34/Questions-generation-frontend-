import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questionForm!: FormGroup;
  submitted = false;
  loading = false;
  questions: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      text: ['', Validators.required],
      num_questions: [10, Validators.required],
      answer_style: ['all', Validators.required]
    });
  }

  get f() {
    return this.questionForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.questionForm.invalid) {
      this.loading = false;
      return;
    }

    this.questionService.generateQuestions(this.questionForm.value)
      .subscribe(
        data => {
          this.questions = data.questions || [];
          this.loading = false;
        },
        error => {
          console.error('Error generating questions:', error);
          this.loading = false;
        }
      );
  }
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  // saveAsTextFile() {
  //   let text = '';
  //   this.questions.forEach(q => {
  //     text += `Question: ${q.question}\n`;
  //     if (Array.isArray(q.answer)) {
  //       q.answer.forEach(ans => {
  //         text += `Answer: ${ans.answer} ${ans.correct ? '(Correct)' : ''}\n`;
  //       });
  //     } else {
  //       text += `Answer: ${q.answer}\n`;
  //     }
  //     text += '\n';
  //   });

  //   const blob = new Blob([text], { type: 'text/plain' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'questions.txt';
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // }

  // isArray(value: any): boolean {
  //   return Array.isArray(value);
  // }

  logout() {
    this.authService.logout();
  }
}
