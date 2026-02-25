import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateEndpointDto } from './dto/endpoints.dto';
import { EndpointsRepository } from './endpoints.repository';

@Injectable()
export class EndpointsService {
  @Inject(EndpointsRepository)
  private endpointsRepository: EndpointsRepository;

  async createEndpoint(props: CreateEndpointDto) {
    if (!props.name || !props.path || !props.method) {
      throw new BadRequestException('Dados inválidos');
    }

    const { name, path, method } = props;

    const findEndpoints =
      await this.endpointsRepository.findEndpointsByPath(path);

    if (findEndpoints) {
      const existingEndpoint = findEndpoints.find(
        (endpoint) => endpoint.method === method,
      );

      if (existingEndpoint) {
        throw new BadRequestException(
          'Já existe um endpoint com esse path e método',
        );
      }
    }

    const endpoint = await this.endpointsRepository.createEndpoint({
      name,
      path,
      method,
    });

    return { message: 'Endpoint criado com sucesso', data: endpoint };
  }

  async getEndpoints() {
    return this.endpointsRepository.getEndpoints();
  }

  async getEndpointById(id: string) {
    return this.endpointsRepository.findEndpointById(id);
  }
}
