import { Common } from 'src/common/entities/common.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('tests')
export class Test extends Common {
  constructor() {
    super();
  }

  @Column()
  title: string;

  @Column()
  description: string;

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
