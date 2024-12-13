import { Inject, Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { LoginAccountProps } from './interface/accounts.interface';
import { EncryptService } from 'src/infra/encrypt/encrypt.service';
import { TokenService } from 'src/infra/token/token.service';
import { CreateAccountDto } from './dto/accounts.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ErrorHandlerService } from 'src/infra/error-handler/error-handler.service';
import { ErrorStatus } from 'src/infra/error-handler/error-handler.interface';

@Injectable()
export class AccountsService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  @Inject(AccountsRepository)
  private accountsRepository: AccountsRepository;
  @Inject(EncryptService)
  private encryptService: EncryptService;
  @Inject(TokenService)
  private tokenService: TokenService;
  @Inject(ErrorHandlerService)
  private errorHandlerService: ErrorHandlerService;

  async createAccount(props: CreateAccountDto) {
    const { name, email, password } = props;

    if (!name?.trim() || !email?.trim() || !email?.includes('@')) {
      this.errorHandlerService.dispatch({
        message: 'Nome ou email inválidos',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    if (!password) {
      this.errorHandlerService.dispatch({
        message: 'Senha inválida',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const existingAccount =
      await this.accountsRepository.findAccountByEmail(email);

    if (existingAccount) {
      this.errorHandlerService.dispatch({
        message: 'Email já cadastrado',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    if (!password.trim() || password.trim().length < 8) {
      this.errorHandlerService.dispatch({
        message: 'A senha deve conter no mínimo 8 caracteres',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!passwordRegex.test(password)) {
      this.errorHandlerService.dispatch({
        message:
          'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const passwordHash = this.encryptService.generateHash(password);

    const account = await this.accountsRepository.createAccount({
      name,
      email,
      password: passwordHash,
    });

    if (!account) {
      this.errorHandlerService.dispatch({
        message: 'Erro ao criar a conta',
        status: ErrorStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return {
      message: 'Conta criada com sucesso',
    };
  }

  async login({ email, password }: LoginAccountProps) {
    if (!email?.trim() || !email?.includes('@')) {
      this.errorHandlerService.dispatch({
        message: 'Email inválido',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    if (!password) {
      this.errorHandlerService.dispatch({
        message: 'Senha inválida',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const account = await this.accountsRepository.findAccountByEmail(email);

    if (!account) {
      this.errorHandlerService.dispatch({
        message: 'Conta não encontrada',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const decryptedPassword = this.encryptService.decryptHash(account.password);

    if (decryptedPassword !== password) {
      this.errorHandlerService.dispatch({
        message: 'Senha inválida',
        status: ErrorStatus.BAD_REQUEST,
      });
    }

    const token = this.tokenService.createToken(account.id);

    return token;
  }
}
