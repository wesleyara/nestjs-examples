import { Prisma } from '@prisma/client';

export type CreateAccountProps = Prisma.AccountCreateInput;
export type AccountTypes = Prisma.AccountWhereUniqueInput;

export interface LoginAccountProps {
  email: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user: AccountTypes;
}
