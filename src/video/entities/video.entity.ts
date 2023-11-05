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

  @Column({ nullable: true })
  captions: string;
}
