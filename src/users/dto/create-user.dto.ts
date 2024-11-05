import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, Length } from 'class-validator';

export enum usersProfileEnum {
  SUPERADMIN = 'SUPERADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  DIRECTOR = 'DIRECTOR',
}

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'The name of the user',
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The document of the user',
    example: '12345678900 or 12345678900000',
    required: true,
  })
  @Length(11, 14, { message: 'O documento deve conter 11 ou 14 digitos' })
  document: string;

  matricula?: string;

  @ApiProperty({
    type: String,
    description: 'The email of the user',
    example: '4qoZB@example.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    required: true,
  })
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Rg deve ser uma string' })
  rg?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Celular deve ser uma string' })
  @Length(11, 13, { message: 'envie um número de celular válido' })
  cell_phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Telefone residencial deve ser uma string' })
  @Length(10, 13, { message: 'envie um número de celular válido' })
  home_phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Genero deve ser uma string' })
  gender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsIn(
    [
      usersProfileEnum.SUPERADMIN,
      usersProfileEnum.DIRECTOR,
      usersProfileEnum.TEACHER,
      usersProfileEnum.STUDENT,
    ],
    {
      message: `Campo profile deve estar entre os valores ${usersProfileEnum.SUPERADMIN}, ${usersProfileEnum.DIRECTOR}, ${usersProfileEnum.TEACHER} ou ${usersProfileEnum.STUDENT}`,
    },
  )
  profile: usersProfileEnum;
}
