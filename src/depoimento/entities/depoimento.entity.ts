import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: string;

  @Column({ name: 'foto', length: 255, nullable: false })
  @ApiProperty()
  foto: string;

  @Column({ name: 'depoimento', length: 255, nullable: false })
  @ApiProperty()
  depoimento: string;

  @Column({ name: 'username', length: 50, nullable: false })
  @ApiProperty()
  username: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;

  constructor(createdDepoimento?: Partial<Depoimento>) {
    this.id = createdDepoimento?.id;
    this.foto = createdDepoimento?.foto;
    this.depoimento = createdDepoimento?.depoimento;
    this.username = createdDepoimento?.username;
    this.createdAt = createdDepoimento?.createdAt;
    this.updatedAt = createdDepoimento?.updatedAt;
    this.deletedAt = createdDepoimento?.deletedAt;
  }
}
