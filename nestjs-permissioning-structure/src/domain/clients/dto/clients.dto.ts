export interface CreateClientDto {
  name: string;
  document: string;
  phone: string;
  address: string;
  email: string;
}

export type GetClientsDto = CreateClientDto;
