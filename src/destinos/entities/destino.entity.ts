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

  @Column({ name: 'foto_1', length: 255, nullable: false })
  foto1: string;

  @Column({ name: 'foto_2', length: 255, nullable: false })
  foto2: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'meta', length: 160, nullable: false })
  meta: string;

  @Column({ name: 'textoDescritivo', length: 255, nullable: true })
  textoDescritivo: string;

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
    this.foto1 = createdDestino?.foto1;
    this.foto2 = createdDestino?.foto2;
    this.nome = createdDestino?.nome;
    this.meta = createdDestino?.meta;
    this.textoDescritivo = createdDestino?.textoDescritivo;
    this.preco = createdDestino?.preco;
    this.createdAt = createdDestino?.createdAt;
    this.updatedAt = createdDestino?.updatedAt;
    this.deletedAt = createdDestino?.deletedAt;
  }
}
