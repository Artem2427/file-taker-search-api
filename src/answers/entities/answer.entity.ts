import { Question } from 'src/questions/entities/question.entity';
import { ManyToOne } from 'typeorm';

export class Answer {
  id: string;
  answer: string;
  isCorrect: boolean;

  @ManyToOne((type) => Question, (question) => question.anwers)
  question: Question;
}
