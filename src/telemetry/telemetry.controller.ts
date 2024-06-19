import { Body, Controller, Get, Post, Delete } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { ITelemetry } from './telemetry.model';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('/')
  async addNewPacket(@Body() packet: ITelemetry) {
    await this.telemetryService.addNewPacket(packet);
  }

  @Get('/latest')
  async getLatestPacket() {
    return await this.telemetryService.getLatestPacket();
  }

  @Get('/')
  async getAllPackets() {
    return await this.telemetryService.getAllPackets();
  }

  @Delete('/')
  async removeAllPackets() {
    await this.telemetryService.removeAllPackets();
  }
}
