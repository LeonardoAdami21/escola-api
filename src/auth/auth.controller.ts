import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('')
@ApiTags('Autenticação e Autorização')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginAuthDto })
  @ApiOperation({ summary: 'Logar no sistema' })
  @ApiOkResponse({ description: 'Login realizado com sucesso' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiBadRequestResponse({ description: 'Credenciais inválidas' })
  @ApiConflictResponse({ description: 'Usuário inativo' })
  async login(@Request() dto: Users) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('student/login')
  @ApiBody({ type: LoginAuthDto })
  @ApiOperation({ summary: 'Studante logar no sistema' })
  @ApiOkResponse({ description: 'Login realizado com sucesso' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  @ApiBadRequestResponse({ description: 'Credenciais inválidas' })
  @ApiConflictResponse({ description: 'Usuário inativo' })
  async studentLogin(@Request() dto: Users) {
    try {
      return await this.authService.studenLogin(dto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
