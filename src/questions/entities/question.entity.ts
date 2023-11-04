import { Answer } from 'src/answers/entities/answer.entity';
import { Test } from 'src/test/entities/test.entity';
import { ManyToOne, OneToMany } from 'typeorm';

export class Question {
  id: string;
  question: string;

  @OneToMany(() => Answer, (answers) => answers.question)
  anwers: Answer[];

  @ManyToOne(() => Test, (test) => test.questions)
  test: Test;
}
