import { Video } from 'src/video/entities/video.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('captions')
export class Caption {
  constructor(Partial: Partial<Caption>) {
    Object.assign(this, Partial);
  }

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  text: string;

  @Column()
  duration: number;

  @Column()
  offset: number;

  @ManyToOne(() => Video, (video) => video.captions)
  video: Video;
}
