import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: 'POSTGRES_POOL',
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          user: configService.get<string>('POSTGRES_USER'),
          host: configService.get<string>('POSTGRES_HOST'),
          database: configService.get<string>('POSTGRES_NAME'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          port: configService.get<number>('POSTGRES_PORT'),
          ssl: {
            rejectUnauthorized: false, // Set this to true if you have the proper SSL certificate setup
          },
        });

        await pool.connect();
        return pool;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['POSTGRES_POOL'],
})
export class PostgresModule {}
