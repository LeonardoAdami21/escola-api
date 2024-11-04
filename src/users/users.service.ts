import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto, usersProfileEnum } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@Inject('USERS_REPOSITORY') private readonly usersRepository: PrismaClient) {}
  
  async generateMatricula() {
    const anoAtual = new Date().getFullYear().toString();
    const ramdomNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'); 
    return `${anoAtual}${ramdomNumber}`
  }

  async create(dto: CreateUserDto) {
    const {name, document, matricula, email, profile, password} = dto;
    if(!name || !document || !email || !password) {
      throw new BadRequestException('Todos os campos devem ser preenchidos');
    }
    if(document.length !== 11 && document.length !== 14) {
      throw new ConflictException('Documento deve conter 11 ou 14 digitos');
    }
    const emailExists = await this.usersRepository.users.findFirst({
      where: {
        email: email
      }
    })
    if(emailExists) {
      throw new ConflictException('Email ja existe');
    }
    const documentExists = await this.usersRepository.users.findFirst({
      where: {
        document: document
      }
    })
    if(documentExists) {
      throw new ConflictException('Documento ja existe');
    }
  
    const matriculaGenerated = await this.generateMatricula();
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.users.create({
      data: {
        name: name,
        document: document,
        email: email,
        matricula: matricula ? matricula : matriculaGenerated,
        password: hashPassword,
        profile : profile ?? usersProfileEnum.STUDENT
      }
    })
    return {
      message: 'Cadastro realizado com sucesso',
      data: user
    }
  }

  async createAdmin(dto: CreateUserDto) {
    const {name, document, matricula, email, profile, password} = dto;
    if(!name || !document || !email || !password) {
      throw new BadRequestException('Todos os campos devem ser preenchidos');
    }
    if(document.length !== 11 && document.length !== 14) {
      throw new ConflictException('Documento deve conter 11 ou 14 digitos');
    }
    const emailExists = await this.usersRepository.users.findFirst({
      where: {
        email: email
      }
    })
    if(emailExists) {
      throw new ConflictException('Email ja existe');
    }
    const documentExists = await this.usersRepository.users.findFirst({
      where: {
        document: document
      }
    })
    if(documentExists) {
      throw new ConflictException('Documento ja existe');
    }
    const matriculaExists = await this.usersRepository.users.findFirst({
      where: {
        matricula: matricula
      }
    })
    if(matriculaExists) {
      throw new ConflictException('Matricula ja existe');
    }
    const matriculaGenerated = await this.generateMatricula();
    const hashPassword = await bcrypt.hash(password, 10);
    await this.usersRepository.users.create({
      data: {
        name: name,
        document: document,
        email: email,
        matricula: matricula ? matricula : matriculaGenerated,
        password: hashPassword,
        profile : profile ?? usersProfileEnum.SUPERADMIN
      }
    })
  }

  async verifyUserActive(id: number) {
    const user = await this.usersRepository.users.findFirst({
      where: {
        id: id,
        active: true
      }
    })
    if(!user) {
      return false
    }
    return user
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const user = await this.usersRepository.users.update({
      where: {
        id: id
      },
      data: {
        refreshToken: refreshToken
      }
    })
    if(!user) {
      throw new NotFoundException('Usuario não encontrado');
    }
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.users.findFirst({
      where: {
        email: email
      }
    })
    if(!user) {
      throw new NotFoundException('Email nao encontrado');
    }
    return user
  }
}
