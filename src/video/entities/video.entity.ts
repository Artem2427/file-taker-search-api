import { Caption } from 'src/captions/entities/caption.entity';
import { Common } from 'src/common/entities/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('videos')
export class Video extends Common {
  constructor(Partial: Partial<Video>) {
    super();
    Object.assign(this, Partial);
  }

  @Column()
  title: string;

  @Column()
  url: string;

  @OneToMany(() => Caption, (caption) => caption.video)
  captions: Caption[];
}
