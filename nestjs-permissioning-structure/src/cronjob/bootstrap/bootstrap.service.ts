import { Inject, OnApplicationBootstrap } from '@nestjs/common';
import { BootstrapCreateUseCase } from './use-cases/bootstrap-create.use-case';
import { BootstrapConnectUseCase } from './use-cases/bootstrap-connect.use-case';

export class BootstrapService implements OnApplicationBootstrap {
  @Inject(BootstrapCreateUseCase)
  private readonly bootstrapCreateUseCase: BootstrapCreateUseCase;
  @Inject(BootstrapConnectUseCase)
  private readonly bootstrapConnectUseCase: BootstrapConnectUseCase;

  async onApplicationBootstrap() {
    if (!process.env.EXECUTE_BOOTSTRAP) {
      console.log(
        'Bootstrap execution skipped. Set EXECUTE_BOOTSTRAP=true to enable.',
      );
      return;
    }
    console.log('---');
    await this.bootstrapCreateUseCase.execute();
    console.log('---');
    await this.bootstrapConnectUseCase.execute();
    console.log('---');
  }
}
