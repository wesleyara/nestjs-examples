import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AdminsRepository } from 'src/domain/admins/admins.repository';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  @Inject(AdminsRepository)
  private readonly adminsRepository: AdminsRepository;

  async onApplicationBootstrap() {
    const existingAdmin = await this.adminsRepository.findAdmin();

    if (!existingAdmin) {
      console.log('Creating an admin user...');

      await this.adminsRepository.createAdmin({
        username: 'admin',
        password: 'admin',
        role: 'ADMIN',
      });

      return console.log('Admin user created successfully!');
    }

    return console.log('The application is ready to go!');
  }
}
