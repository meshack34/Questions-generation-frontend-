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
          if (data && data.questions) {
            this.questions = data.questions;
          } else {
            this.questions = [];
          }
          this.loading = false;
        },
        error => {
          console.error('Error generating questions:', error);
          this.loading = false;
        }
      );
  }

  logout() {
    this.authService.logout();
  }
}
