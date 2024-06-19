import { Module } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { PostgresModule } from 'src/postgres/postgres.module';

@Module({
  imports: [PostgresModule],
  providers: [TelemetryService],
  controllers: [TelemetryController],
})
export class TelemetryModule {}
