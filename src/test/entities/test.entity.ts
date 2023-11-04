import { Common } from 'src/common/entities/common.entity';
import { Question } from 'src/questions/entities/question.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
}
