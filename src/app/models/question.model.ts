// src/app/models/question.model.ts

// Define the interface for a multiple choice answer
export interface MultipleChoiceAnswer {
    answer: string;
    correct: boolean;
  }
  
  // Define the interface for a question
  export interface Question {
    question: string;
    answer: string | MultipleChoiceAnswer[];
  }
  