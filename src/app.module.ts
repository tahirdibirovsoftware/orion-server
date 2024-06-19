import { Module } from '@nestjs/common';
import { PostgresModule } from './postgres/postgres.module';
import { ConfigModule } from '@nestjs/config';
import { TelemetryModule } from './telemetry/telemetry.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresModule,
    TelemetryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
