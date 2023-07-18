import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'depoimentos' })
export class Depoimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'foto', length: 255, nullable: false })
  foto: string;

  @Column({ name: 'depoimento', length: 255, nullable: false })
  depoimento: string;

  @Column({ name: 'username', length: 50, nullable: false })
  username: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
