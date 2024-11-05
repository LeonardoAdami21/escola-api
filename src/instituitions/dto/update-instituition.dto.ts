import { PartialType } from '@nestjs/swagger';
import { CreateInstituitionDto } from './create-instituition.dto';

export class UpdateInstituitionDto extends PartialType(CreateInstituitionDto) {}
