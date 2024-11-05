import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstituitionDto } from './dto/create-instituition.dto';
import { UpdateInstituitionDto } from './dto/update-instituition.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class InstituitionsService {
  constructor(
    @Inject('INSTITUITIONS_REPOSITORY')
    private readonly instituitionsRepository: PrismaClient,
  ) {}
  async create(dto: CreateInstituitionDto) {
    try {
      const {
        name,
        email,
        streetNumber,
        zip_code,
        city,
        phone,
        street,
        state,
        district,
      } = dto;
      let director_id:number = null;
      if (!name || !email) {
        throw new BadRequestException('Name and email are required');
      }

      const emailExists = await this.instituitionsRepository.instituitions.findFirst({
        where: {
          email: email,
        },
      })  
      
      if (emailExists) {
        throw new ConflictException('Email already exists');
      }

      const clientExists = await this.instituitionsRepository.instituitions.findFirst({
        where: {
          client_id: dto.client_id
        }
      })

      if (clientExists) {
        throw new NotFoundException('Client not found');
      }

      const instituition =
        await this.instituitionsRepository.instituitions.create({
          data: {
            name,
            email,
            streetNumber,
            zip_code,
            city,
            phone,
            street,
            state,
            district,
            user_direcort_id: director_id,
            client_id: dto.client_id
          },
        });
      return {
        message: 'Instituition created successfully',
        data: instituition,
      };
    } catch (error) {
      throw new InternalServerErrorException({message: error.message});
    }
  }

  async findAll() {
    const instituitions =
      await this.instituitionsRepository.instituitions.findMany();
    return instituitions;
  }

  async findOne(id: number) {
    const instituition =
      await this.instituitionsRepository.instituitions.findUnique({
        where: {
          id: id,
        },
      });
    if (!instituition) {
      throw new NotFoundException('Instituition not found');
    }
    return instituition;
  }

  async update(id: number, updateInstituitionDto: UpdateInstituitionDto) {
    const instituition =
      await this.instituitionsRepository.instituitions.findUnique({
        where: {
          id: id,
        },
      });

    if (!instituition) {
      throw new NotFoundException('Instituition not found');
    }

    await this.instituitionsRepository.instituitions.update({
      where: {
        id: id,
      },
      data: {
        ...updateInstituitionDto,
      },
    });

    return {
      message: 'Instituition updated successfully',
    };
  }

  async remove(id: number) {
    const instituition =
      await this.instituitionsRepository.instituitions.findUnique({
        where: {
          id: id,
        },
      });

    if (!instituition) {
      throw new NotFoundException('Instituition not found');
    }
    await this.instituitionsRepository.instituitions.delete({
      where: {
        id: id,
      },
    });
    return {
      message: 'Instituition deleted successfully',
    };
  }
}
