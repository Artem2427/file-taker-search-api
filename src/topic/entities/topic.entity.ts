import { Subject } from 'src/subjects/entities/subject.entity';
import { Test } from 'src/test/entities/test.entity';
import { ManyToMany, ManyToOne } from 'typeorm';

export class Topic {
  id: string;
  name: string;
  description: string;

  // @ManyToOne(() => Subject, (subject) => subject.topics)
  // subject: Subject;

  //   @ManyToMany(() => Test, (test) => test.topics)
  //   tests: Test[];
}
