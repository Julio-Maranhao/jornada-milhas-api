import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDestinoDto {
  @IsNotEmpty({ message: 'O campo foto não pode ser vazio' })
  @IsString()
  foto: string;

  @IsNotEmpty({ message: 'O campo nome não pode ser vazio' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'O campo preco não pode ser vazio' })
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false },
    { message: 'O campo preco deve ser um numero com até 2 casas decimais.' },
  )
  preco: number;
}
