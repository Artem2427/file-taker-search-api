import { Common } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('files')
export class File extends Common {
  constructor() {
    super();
  }

  @Column()
  trancription: string;

  @Column({ length: 255 })
  originalName: string;

  @Column({ length: 255 })
  mimeType: string;

  @Column('bigint')
  size: number;

  @Column({ length: 255 })
  url: string; // URL to access the file if stored externally

  @Column({ type: 'bytea' })
  data: Buffer;

  //   @ManyToOne(() => User, (user) => user.files)
  //   user: User;
}
