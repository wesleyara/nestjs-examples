import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { LoginAccountProps } from './interface/accounts.interface';
import { EncryptService } from 'src/infra/encrypt/encrypt.service';
import { TokenService } from 'src/infra/token/token.service';
import { CreateAccountDto } from './dto/accounts.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AccountsService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  @Inject(AccountsRepository)
  private accountsRepository: AccountsRepository;
  @Inject(EncryptService)
  private encryptService: EncryptService;
  @Inject(TokenService)
  private tokenService: TokenService;

  async createAccount(props: CreateAccountDto) {
    const { name, email, password } = props;

    if (!name?.trim() || !email?.trim() || !email?.includes('@')) {
      throw new BadRequestException('Nome ou email inválidos');
    }

    if (!password) {
      throw new BadRequestException('Senha inválida');
    }

    const existingAccount =
      await this.accountsRepository.findAccountByEmail(email);

    if (existingAccount) {
      throw new BadRequestException('Email já cadastrado');
    }

    if (!password.trim() || password.trim().length < 8) {
      throw new BadRequestException(
        'A senha deve conter no mínimo 8 caracteres',
      );
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(password)) {
      throw new BadRequestException(
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      );
    }

    const passwordHash = this.encryptService.generateHash(password);

    await this.accountsRepository.createAccount({
      name,
      email,
      password: passwordHash,
    });

    return {
      message: 'Conta criada com sucesso',
    };
  }

  async login({ email, password }: LoginAccountProps) {
    if (!email?.trim() || !email?.includes('@')) {
      throw new BadRequestException('Email inválido');
    }

    if (!password) {
      throw new BadRequestException('Senha inválida');
    }

    const account = await this.accountsRepository.findAccountByEmail(email);

    const decryptedPassword = this.encryptService.decryptHash(account.password);

    if (decryptedPassword !== password) {
      throw new BadRequestException('Senha inválida');
    }

    const token = this.tokenService.createToken(account.id);

    return token;
  }
}
