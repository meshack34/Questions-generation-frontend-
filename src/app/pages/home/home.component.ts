// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { QuestionService } from '../../services/question.service';
import { Question, MultipleChoiceAnswer } from '../../models/question.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questionForm!: FormGroup;
  submitted = false;
  loading = false;
  questions: Question[] = [];

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

  saveAsPDF() {
    const doc = new jsPDF();
    const questionsContainer = document.createElement('div');
    questionsContainer.classList.add('pdf-container');

    this.questions.forEach(question => {
      const questionElement = document.createElement('div');
      questionElement.classList.add('pdf-question');

      const questionText = document.createElement('strong');
      questionText.textContent = question.question;
      questionElement.appendChild(questionText);

      if (Array.isArray(question.answer)) {
        (question.answer as MultipleChoiceAnswer[]).forEach((ans: MultipleChoiceAnswer) => {
          const answerText = document.createElement('p');
          answerText.textContent = `${ans.answer} ${ans.correct ? '(Correct)' : ''}`;
          questionElement.appendChild(answerText);
        });
      } else {
        const answerText = document.createElement('p');
        answerText.textContent = question.answer;
        questionElement.appendChild(answerText);
      }

      questionsContainer.appendChild(questionElement);
    });

    document.body.appendChild(questionsContainer);

    html2canvas(questionsContainer).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('questions.pdf');
      document.body.removeChild(questionsContainer);
    });
  }

  logout() {
    this.authService.logout();
  }

  isArray(value: any): value is MultipleChoiceAnswer[] {
    return Array.isArray(value);
  }
}
