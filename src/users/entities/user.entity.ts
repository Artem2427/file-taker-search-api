import { Common } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends Common {
  constructor() {
    super();
  }

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  roles: 'Mentor' | 'Trainee';
}
