import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

@Entity('devs')
class Dev {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  github_username: string;

  @Column()
  bio: string;

  @Column()
  posts: number;

  @ManyToMany(() => Dev)
  @JoinColumn({ name: 'connected_devs' })
  connected_devs: Dev;

  @Column()
  avatar_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Dev;
