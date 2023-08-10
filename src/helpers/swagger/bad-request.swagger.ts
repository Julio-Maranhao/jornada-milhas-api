import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwagger {
  @ApiProperty({ default: 400 })
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty({ default: 'BadRequest' })
  error: string;
}
