import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'destinos' })
export class Destino {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'foto', length: 255, nullable: false })
  foto: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'preco', nullable: false, type: 'real' })
  preco: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(createdDestino?: Partial<Destino>) {
    this.id = createdDestino?.id;
    this.foto = createdDestino?.foto;
    this.nome = createdDestino?.nome;
    this.preco = createdDestino?.preco;
    this.createdAt = createdDestino?.createdAt;
    this.updatedAt = createdDestino?.updatedAt;
    this.deletedAt = createdDestino?.deletedAt;
  }
}
