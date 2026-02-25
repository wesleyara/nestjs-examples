import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedRequest } from 'src/domain/accounts/interface/accounts.interface';

@Injectable()
export class ProfileGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    const headers = request.headers as unknown as Record<
      string,
      string | string[] | undefined
    >;

    const headerValue = headers?.['profile-id'];
    const profileId = Array.isArray(headerValue) ? headerValue[0] : headerValue;

    if (!profileId || typeof profileId !== 'string') {
      throw new BadRequestException('O profile-id é obrigatório');
    }

    const findProfile = user.accountProfiles.find(
      (profile) => profile?.id === profileId,
    );

    if (!findProfile) {
      throw new ForbiddenException('Perfil do usuário não encontrado');
    }

    request.profile = findProfile;

    return true;
  }
}
