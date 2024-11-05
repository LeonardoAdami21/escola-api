import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Clientes')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiCreatedResponse({ description: 'Cliente criado com sucesso.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @ApiOperation({ summary: 'Busca todos os clientes' })
  @ApiOkResponse({ description: 'Retorna todos os clientes.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @ApiOperation({ summary: 'Busca um cliente pelo ID' })
  @ApiOkResponse({ description: 'Retorna o cliente pelo ID.' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualiza um cliente pelo ID' })
  @ApiOkResponse({ description: 'Cliente atualizado com sucesso.' })
  @ApiBadRequestResponse({ description: 'ID inválido.' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @ApiOperation({ summary: 'Remove um cliente pelo ID' })
  @ApiOkResponse({ description: 'Cliente removido com sucesso.' })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
