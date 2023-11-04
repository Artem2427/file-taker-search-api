import { Topic } from 'src/topic/entities/topic.entity';
import { ManyToOne } from 'typeorm';

export class Step {
  id: string;

  name: string;

  description: string;

  // @ManyToOne(() => Topic, (topic) => topic.steps)
  // topic: Topic;

  //   @ManyToMany(() => Test, (steps) => steps.tests)
  //   tests: Test[];
}
