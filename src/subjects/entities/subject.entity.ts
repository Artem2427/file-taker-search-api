import { Test } from 'src/test/entities/test.entity';
import { OneToMany } from 'typeorm';

export class Subject {
  id: string;
  name: string;
  description: string;

  @OneToMany(() => Test, (test) => test.subject)
  tests: Test[];
}
