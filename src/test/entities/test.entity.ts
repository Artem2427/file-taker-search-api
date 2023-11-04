import { Subject } from 'rxjs';
import { Question } from 'src/questions/entities/question.entity';
import { ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';

export class Test {
  id: string;
  title: string;
  description: string;

  kind: 'company' | 'policies' | 'processes';

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @OneToOne(() => Subject, (subject) => subject.test)
  subject: Subject;
}
