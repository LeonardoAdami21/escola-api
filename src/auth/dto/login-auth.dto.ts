import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    type: String,
    description: 'The matricula of the user',
    required: true,
  })
  matricula: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
  })
  password: string;
}
