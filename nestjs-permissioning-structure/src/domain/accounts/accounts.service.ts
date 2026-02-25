import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { LoginAccountProps } from './interface/accounts.interface';
import { EncryptService } from 'src/infra/encrypt/encrypt.service';
import { TokenService } from 'src/infra/token/token.service';
import { CreateAccountDto } from './dto/accounts.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  accountCreateSchema,
  accountLoginSchema,
} from './schemas/accounts.schemas';

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
    const result = accountCreateSchema.safeParse(props);
    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    const { name, username, password } = props;

    const existingAccount =
      await this.accountsRepository.findAccountByUsername(username);

    if (existingAccount) {
      throw new BadRequestException('Username já cadastrado');
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
      username,
      password: passwordHash,
    });

    return {
      message: 'Conta criada com sucesso',
    };
  }

  // TODO: implement account first access logic, which forces the user to change their password on first login.
  async login(props: LoginAccountProps) {
    const result = accountLoginSchema.safeParse(props);
    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    const { username, password } = props;

    const account = await this.accountsRepository.findAccountByUsername(
      username,
      true,
    );

    if (!account) {
      throw new BadRequestException('Usuário ou senhas inválidos');
    }

    const decryptedPassword = this.encryptService.decryptHash(account.password);

    if (decryptedPassword !== password) {
      throw new BadRequestException('Usuário ou senhas inválidos');
    }

    const tokens = this.tokenService.generateTokens(account.id);

    return tokens;
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token não fornecido');
    }

    const decoded = this.tokenService.verifyToken(refreshToken);

    if ('message' in decoded) {
      throw new UnauthorizedException(decoded.message);
    }

    const accountId = decoded.id;

    const account = await this.accountsRepository.findAccountById(accountId);

    if (!account) {
      throw new InternalServerErrorException('Conta não encontrada');
    }

    const tokens = this.tokenService.generateTokens(account.id);

    return tokens;
  }

  async getAccountByUsername(username: string) {
    return this.accountsRepository.findAccountByUsername(username);
  }
}
