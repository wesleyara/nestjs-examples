import { createClient } from '@libsql/client/.';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });

    const adapter = new PrismaLibSQL(libsql);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
