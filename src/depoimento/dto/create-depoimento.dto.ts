import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepoimentoDto {
  @IsNotEmpty({ message: 'O caminho da foto não pode ser vazio.' })
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  foto: string;

  @IsNotEmpty({ message: 'O depoimento não pode ser vazio.' })
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  depoimento: string;

  @IsNotEmpty({
    message: 'O nome do usuário que criou o depoimento não pode ser vazio.',
  })
  @IsString()
  @MaxLength(50)
  @ApiProperty()
  username: string;
}
