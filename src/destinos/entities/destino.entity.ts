import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GptIntegration } from '../ai/gpt-integrations.provider';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'destinos' })
export class Destino {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ name: 'foto_1', length: 255, nullable: false })
  @ApiProperty()
  foto1: string;

  @Column({ name: 'foto_2', length: 255, nullable: false })
  @ApiProperty()
  foto2: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @Column({ name: 'meta', length: 160, nullable: false })
  @ApiProperty()
  meta: string;

  @Column({ name: 'textoDescritivo', length: 255, nullable: true })
  @ApiProperty({ required: false })
  textoDescritivo: string;

  @Column({ name: 'preco', nullable: false, type: 'real' })
  @ApiProperty()
  preco: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
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

  @BeforeInsert()
  async setTextoDescritivo() {
    if (!this.textoDescritivo) {
      this.textoDescritivo = await GptIntegration.GenerateDescription(
        this.nome,
      );
    }
  }
}
