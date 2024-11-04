import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuario' })
  @ApiBadRequestResponse({ description: 'Email ou documento ja existem' })
  @ApiConflictResponse({ description: 'Todos os campos devem ser preenchidos' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
