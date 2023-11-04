import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Common {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({
    name: 'date_added',
    type: 'date',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  dateAdded: Date;

  @UpdateDateColumn({
    name: 'date_modified',
    type: 'date',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  dateModified: Date;
}
