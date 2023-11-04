import { Answer } from 'src/answers/entities/answer.entity';
import { Common } from 'src/common/entities/common.entity';
import { Test } from 'src/test/entities/test.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';

export class Question extends Common {
  constructor() {
    super();
  }

  @Column()
  question: string;

  @OneToMany(() => Answer, (answers) => answers.question)
  anwers: Answer[];

  @ManyToOne(() => Test, (test) => test.questions)
  test: Test;
}
