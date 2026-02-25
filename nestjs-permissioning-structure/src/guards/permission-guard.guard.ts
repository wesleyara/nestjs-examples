import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AuthenticatedRequest } from 'src/domain/accounts/interface/accounts.interface';
import { ProfileTypes } from 'src/domain/profiles/interfaces/profiles.interface';
import { ProfilesRepository } from 'src/domain/profiles/profiles.repository';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const profile = request.profile;
    const { url, method } = request;

    const cacheKey = `profiles`;

    let profiles: ProfileTypes[] = await this.cacheService.get(cacheKey);

    if (!profiles) {
      profiles = await this.profilesRepository.getProfiles();
      await this.cacheService.set(cacheKey, profiles, { ttl: 604800 } as any);
    }

    const findProfile = profiles.find((p) => p.id === profile.id);

    if (!findProfile) {
      throw new UnauthorizedException('Perfil do usuário não encontrado');
    }

    const profileEndpoints = findProfile.profileEndpoints.map(
      (pe) => pe.endpoint,
    );
    const hasPermission = profileEndpoints.some(
      (endpoint) =>
        endpoint.path === url.split('?')[0] && endpoint.method === method,
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'Usuário não tem permissão para acessar este recurso',
      );
    }

    return true;
  }
}
