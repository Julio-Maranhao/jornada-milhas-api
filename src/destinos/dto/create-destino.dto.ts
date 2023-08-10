import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Destino } from '../entities/destino.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDestinoDto {
  @IsNotEmpty({ message: 'O campo foto1 não pode ser vazio' })
  @IsString()
  @ApiProperty()
  foto1: string;

  @IsNotEmpty({ message: 'O campo foto2 não pode ser vazio' })
  @IsString()
  @ApiProperty()
  foto2: string;

  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  @IsString()
  @ApiProperty()
  nome: string;

  @IsNotEmpty({ message: 'O campo meta não pode ser vazio' })
  @IsString()
  @ApiProperty()
  meta: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  textoDescritivo: string;

  @IsNotEmpty({ message: 'O campo preco não pode ser vazio' })
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false },
    { message: 'O campo preco deve ser um numero com até 2 casas decimais.' },
  )
  @ApiProperty()
  preco: number;

  constructor(destino?: Partial<Destino>) {
    this.foto1 = destino?.foto1;
    this.foto2 = destino?.foto2;
    this.nome = destino?.nome;
    this.meta = destino?.meta;
    this.textoDescritivo = destino?.textoDescritivo;
    this.preco = destino?.preco;
  }
}
