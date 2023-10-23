import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UrlRegistry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 257 })
  dropperId: string;

  @Column({ type: 'varchar', length: 2000 })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  timestamp: string;
}
