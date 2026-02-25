import { Prisma } from '@prisma/client';

export type CreateAccountProps = Prisma.AccountCreateInput;
export type AccountTypes = Prisma.AccountWhereUniqueInput;

export interface LoginAccountProps {
  username: string;
  password: string;
}

export interface AuthenticatedAccount {
  id: string;
  username: string;
  name: string;
  accountProfiles: AuthenticatedProfile[];
}

export interface AuthenticatedProfile {
  id: string;
  name: string;
  profileOffices: ProfileOffice[];
}

export interface ProfileOffice {
  id: string;
  name: string;
  location: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedAccount;
  profile?: AuthenticatedProfile;
  office?: ProfileOffice;
}
