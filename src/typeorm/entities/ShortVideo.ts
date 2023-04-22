import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../Base';
import { User } from './User';

@Entity()
export class ShortVideo extends Base {
  
  @Column()
  title: string;

  @Column({default: ''})
  description: string;
  
  @ManyToOne(() => User, user => user.shorts)
  @JoinColumn()
  channel: User

  @Column({default: ''})
  shares: string

  @Column()
  url: string;

  @Column({ default: 0 })
  dislike: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  views?: number;

}
