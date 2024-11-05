import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateInstituitionDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'nome deve ser uma string' })
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'slug deve ser uma string' })
  slug: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Id do cliente é obrigatório' })
  @IsInt({ message: 'Parametro client_id deve ser um número' })
  client_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Parametro user_director_id deve ser um número' })
  user_director_id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Envie um email válido' })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Telefone/cellular é obrigatório' })
  @IsString({ message: 'Celular deve ser uma string' })
  @Length(8, 13, { message: 'envie um número de telefone/celular válido' })
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Cep é obrigatório' })
  @IsString({ message: 'Cep deve ser uma string' })
  @Matches(/^\d{5}-\d{3}$/, { message: 'Cep deve ser no formato 00000-000' })
  zip_code: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Rua é obrigatório' })
  @IsString({ message: 'Rua deve ser uma string' })
  street: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Rua é obrigatório' })
  @Matches(/^\d+$/, { message: 'Envie apenas numeros' })
  streetNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'Complemento deve ser uma string' })
  complement?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Bairro é obrigatório' })
  @IsString({ message: 'Bairro deve ser uma string' })
  district: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Cidade é obrigatório' })
  @IsString({ message: 'Cidade deve ser uma string' })
  city: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  @IsString({ message: 'Estado deve ser uma string' })
  state: string;
}
