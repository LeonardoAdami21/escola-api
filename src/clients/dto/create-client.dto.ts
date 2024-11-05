import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateClientDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Id do gestor é obrigatório' })
  @IsInt({ message: 'Parametro  manage_id deve ser um número' })
  manager_id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Razão  social é obrigatório' })
  @IsString({ message: 'Parametro corporate_name deve ser uma string' })
  corporate_name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Inscrição estadual é obrigatório' })
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'Envie um cnpj válido',
  })
  @IsString({ message: 'Cnpj deve ser uma string' })
  cnpj: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Inscrição estadual é obrigatório' })
  @IsString({ message: 'Inscrição estadual deve ser uma string' })
  state_registry: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Inscrição estadual é obrigatório' })
  @IsString({ message: 'Telefone deve ser uma string' })
  @Length(10, 13, { message: 'envie um número de telefone válido' })
  phone: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Inscrição estadual é obrigatório' })
  @IsEmail({}, { message: 'Envie um email válido' })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  street: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({ required: true })
  district: string;

  @ApiProperty({ required: true })
  street_number: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  complement?: string;
}
