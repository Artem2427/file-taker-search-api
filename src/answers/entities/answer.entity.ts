import { Common } from 'src/common/entities/common.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('answers')
export class Answer extends Common {
  constructor() {
    super();
  }

  @Column()
  answer: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne((type) => Question, (question) => question.anwers)
  question: Question;
}
