import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstituitionsService } from './instituitions.service';
import { CreateInstituitionDto } from './dto/create-instituition.dto';
import { UpdateInstituitionDto } from './dto/update-instituition.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('instituitions')
@ApiTags('Universidades')
export class InstituitionsController {
  constructor(private readonly instituitionsService: InstituitionsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma universidade.' })
  @ApiCreatedResponse({ description: 'A universidade foi criada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Nome e email são obrigatórios.' })
  @ApiConflictResponse({ description: 'Email já cadastrado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  create(@Body() createInstituitionDto: CreateInstituitionDto) {
    return this.instituitionsService.create(createInstituitionDto);
  }

  @ApiOperation({ summary: 'Listar todas as universidades.' })
  @ApiOkResponse({ description: 'Retorna todas as universidades.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Get()
  findAll() {
    return this.instituitionsService.findAll();
  }

  @ApiOperation({ summary: 'Listar uma universidade.' })
  @ApiOkResponse({ description: 'A universidade foi retornada.' })
  @ApiNotFoundResponse({ description: 'Universidade não encontrada.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituitionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualizar uma universidade.' })
  @ApiOkResponse({ description: 'A universidade foi atualizada com sucesso.' })
  @ApiBadRequestResponse({ description: 'Nome e email são obrigatórios.' })
  @ApiNotFoundResponse({ description: 'Universidade não encontrada.' })
  @ApiConflictResponse({ description: 'Email já cadastrado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstituitionDto: UpdateInstituitionDto,
  ) {
    return this.instituitionsService.update(+id, updateInstituitionDto);
  }

  @ApiOperation({ summary: 'Remover uma universidade.' })
  @ApiCreatedResponse({ description: 'A universidade foi removida com sucesso.' })
  @ApiNotFoundResponse({ description: 'Universidade não encontrada.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituitionsService.remove(+id);
  }
}
