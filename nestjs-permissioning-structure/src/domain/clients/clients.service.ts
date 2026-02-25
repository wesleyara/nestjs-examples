import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto, GetClientsDto } from './dto/clients.dto';
import { clientCreateSchema } from './schemas/clients.schemas';
import { GetClientsWhere } from './interfaces/clients.interface';

@Injectable()
export class ClientsService {
  @Inject(ClientsRepository)
  private clientsRepository: ClientsRepository;

  async createClient(data: CreateClientDto) {
    const result = clientCreateSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    const existingClient = await this.clientsRepository.getClientByDocument(
      data.document,
    );

    if (existingClient) {
      throw new BadRequestException('Já existe um cliente com esse documento');
    }

    await this.clientsRepository.createClient(data);

    return { message: 'Cliente criado com sucesso' };
  }

  async getClients(data: GetClientsDto) {
    const dataWrapped: GetClientsWhere = {
      ...this.getQueryPayload(data),
    };

    return this.clientsRepository.getClients(dataWrapped);
  }

  getQueryPayload<TData>(data: TData) {
    const entries = Object.entries(data);

    const tempObject: GetClientsWhere = {};
    for (const [key, value] of entries) {
      if (value) {
        tempObject[key] = {
          contains: value,
        };
      }
    }

    return tempObject;
  }
}
