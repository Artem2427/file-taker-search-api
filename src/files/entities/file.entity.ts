import { Common } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('files')
export class File extends Common {
  constructor() {
    super();
  }

  @Column()
  title: string;

  @Column({ nullable: true })
  trancription: string;

  @Column({ length: 255 })
  originalName: string;

  @Column({ length: 255 })
  mimeType: string;

  @Column('bigint')
  size: number;

  //   @Column({ length: 255 })
  //   url: string; // URL to access the file if stored externally

  @Column({ type: 'bytea' })
  buffer: Buffer;

  //   @ManyToOne(() => User, (user) => user.files)
  //   user: User;
}
