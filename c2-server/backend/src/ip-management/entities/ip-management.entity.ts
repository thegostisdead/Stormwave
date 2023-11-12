import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlacklistedIp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  reason: string;

  constructor(blacklistedIp: Partial<BlacklistedIp>) {
    Object.assign(this, blacklistedIp);
  }
}
