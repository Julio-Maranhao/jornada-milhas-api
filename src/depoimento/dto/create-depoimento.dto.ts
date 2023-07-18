import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDepoimentoDto {
  @IsNotEmpty({ message: 'O caminho da foto não pode ser vazio.' })
  @IsString()
  @MaxLength(255)
  foto: string;

  @IsNotEmpty({ message: 'O depoimento não pode ser vazio.' })
  @IsString()
  @MaxLength(255)
  depoimento: string;

  @IsNotEmpty({
    message: 'O nome do usuário que criou o depoimento não pode ser vazio.',
  })
  @IsString()
  @MaxLength(50)
  username: string;
}
