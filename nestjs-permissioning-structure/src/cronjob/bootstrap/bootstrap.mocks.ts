import { CreateAccountDto } from 'src/domain/accounts/dto/accounts.dto';
import { CreateEndpointDto } from 'src/domain/endpoints/dto/endpoints.dto';

// Profiles
export const defaultProfiles = ['Administrador', 'Funcionário Geral'];

// Account
export const defaultAccount: CreateAccountDto = {
  name: 'Fulano do Teste',
  username: 'fulano.teste',
  password: '@Teste1234',
};
export const defaultAccountProfileConnections = {
  username: 'fulano.teste',
  profileName: 'Administrador',
};

// Endpoints
const adminEndpoints: CreateEndpointDto[] = [
  {
    name: '01 - Criar usuário',
    path: '/api/v1/accounts/create',
    method: 'POST',
  },
  {
    name: '05 - Buscar perfis',
    path: '/api/v1/profiles',
    method: 'GET',
  },
];

const employeeEndpoints: CreateEndpointDto[] = [
  {
    name: '06 - Buscar clientes',
    path: '/api/v1/clients',
    method: 'GET',
  },
  {
    name: '07 - Criar cliente',
    path: '/api/v1/clients/create',
    method: 'POST',
  },
];

export const defaultEndpoints: CreateEndpointDto[] = [
  ...adminEndpoints,
  ...employeeEndpoints,
];

export const defaultProfileEndpointConnections = [
  {
    profileName: 'Administrador',
    endpoints: defaultEndpoints,
  },
  {
    profileName: 'Funcionário Geral',
    endpoints: employeeEndpoints,
  },
];
