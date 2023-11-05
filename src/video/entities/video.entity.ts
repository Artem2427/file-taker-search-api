import { Caption } from 'src/captions/entities/caption.entity';
import { Common } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('videos')
export class Video extends Common {
  constructor() {
    super();
  }

  @Column()
  title: string;

  @Column()
  url: string;

  @OneToMany(() => Caption, (caption) => caption.video)
  captions: Caption[];
}
