import { Controller, Get, HttpCode, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth-guard.guard';
import { ProfileGuard } from 'src/guards/profile-guard.guard';
import { ProfilesService } from './profiles.service';
import { PermissionGuard } from 'src/guards/permission-guard.guard';

@Controller('profiles')
export class ProfilesController {
  @Inject(ProfilesService)
  private profilesService: ProfilesService;

  @Get('')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, ProfileGuard, PermissionGuard)
  async getProfiles() {
    const response = await this.profilesService.getProfiles();

    return response.map((profile) => ({
      ...profile,
      profileEndpoints: undefined,
    }));
  }
}
