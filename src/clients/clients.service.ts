import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('CLIENTS_REPOSITORY')
    private readonly clientsRepository: PrismaClient,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const clientExists = await this.clientsRepository.clients.findFirst({
      where: {
        email: createClientDto.email,
      },
    });
    const client = await this.clientsRepository.clients.create({
      data: {
        corporate_name: createClientDto.corporate_name,
        email: createClientDto.email,
        cnpj: createClientDto.cnpj,
        phone: createClientDto.phone,
        street: createClientDto.street,
        district: createClientDto.district,
        city: createClientDto.city,
        state: createClientDto.state,
        zip_code: createClientDto.zip_code,
        streetNumber: createClientDto.street_number,
        complement: createClientDto.complement,
        state_registry: createClientDto.state_registry,
        manager_id: createClientDto.manager_id,
      },
    });
    return {
      message: 'client created successfully',
      data: client,
    };
  }

  async findAll() {
    const clients = await this.clientsRepository.clients.findMany();
    return clients;
  }

  async findOne(id: number) {
    const client = await this.clientsRepository.clients.findUnique({
      where: {
        id: id,
      },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientsRepository.clients.findUnique({
      where: {
        id: id,
      },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    await this.clientsRepository.clients.update({
      where: {
        id: id,
      },
      data: {
        corporate_name: updateClientDto.corporate_name,
        email: updateClientDto.email,
        cnpj: updateClientDto.cnpj,
        phone: updateClientDto.phone,
        street: updateClientDto.street,
        district: updateClientDto.district,
        city: updateClientDto.city,
        state: updateClientDto.state,
        zip_code: updateClientDto.zip_code,
        streetNumber: updateClientDto.street_number,
        complement: updateClientDto.complement,
        state_registry: updateClientDto.state_registry,
        manager_id: updateClientDto.manager_id,
      },
    });

    return {
      message: 'client updated successfully',
    };
  }

  async remove(id: number) {
    const client = await this.clientsRepository.clients.findUnique({
      where: {
        id: id,
      },
    });
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    await this.clientsRepository.clients.delete({
      where: {
        id: id,
      },
    });
    return {
      message: 'client deleted successfully',
    };
  }
}
