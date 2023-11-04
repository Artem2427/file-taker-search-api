import { Question } from 'src/questions/entities/question.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { JoinColumn, OneToMany, OneToOne } from 'typeorm';

export class Test {
  id: string;
  title: string;
  description: string;

  kind: 'company' | 'policies' | 'processes';

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @OneToOne(() => Subject, (subject) => subject.tests)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  //   @OneToMany(() => Topic, (topic) => topic.tests)
  //   topic: Topic;

  //   @OneToMany(() => Step, (step) => step.tests)
  //   step: Step;
}
