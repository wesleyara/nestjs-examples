export interface CreateAccountDto {
  name: string;
  username: string;
  password: string;
}

export interface LoginAccountDto {
  username: string;
  password: string;
}
