import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
  })
  title: string;

  @Column('varchar', {
    nullable: true,
  })
  description: string;

  @Column('varchar', {
    default: 'pending',
  })
  status: string;

  @Column('boolean', {
    default: false,
  })
  is_subtask: boolean;

  @Column('int', {
    nullable: true,
  })
  parent_task_id: number;

  @Column('timestamp', {
    default: () => 'LOCALTIMESTAMP',
  })
  created_at: Date;
}
