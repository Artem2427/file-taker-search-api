import { Common } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends Common {
  constructor() {
    super();
  }

  @Column()
  fullName: string;

  @Column()
  email: string;

  //   @OneToMany(() => File, (files) => files.user)
  //   files: File[];
}
