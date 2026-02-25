import { Prisma } from '@prisma/client';

export type CreateProfileProps = Prisma.ProfileCreateInput;

export interface ProfileTypes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  profileEndpoints: ProfileEndpoint[];
}

export interface ProfileEndpoint {
  id: string;
  profileId: string;
  endpointId: string;
  createdAt: Date;
  updatedAt: Date;
  endpoint: Endpoint;
}

export interface Endpoint {
  id: string;
  name: string;
  path: string;
  method: string;
  createdAt: Date;
  updatedAt: Date;
}
