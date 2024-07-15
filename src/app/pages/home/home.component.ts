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

    if (this.questionForm.invalid) {
      return;
    }

    this.questionService.generateQuestions(this.questionForm.value)
      .subscribe(
        data => {
          console.log('Generated questions:', data);
        },
        error => {
          console.error('Error generating questions:', error);
        }
      );
  }

  logout() {
    this.authService.logout();
  }
}
