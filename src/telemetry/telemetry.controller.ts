import { Body, Controller, Get, Post, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { ITelemetry } from './telemetry.model';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async addNewPacket(@Body() packet: ITelemetry) {
    await this.telemetryService.addNewPacket(packet);
    return { message: 'Telemetry packet added successfully' };
  }

  @Get('/latest')
  async getLatestPacket() {
    const packet = await this.telemetryService.getLatestPacket();
    if (!packet) {
      throw new NotFoundException('No telemetry packets found');
    }
    return packet;
  }

  @Get('/')
  async getAllPackets() {
    return await this.telemetryService.getAllPackets();
  }

  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAllPackets() {
    await this.telemetryService.removeAllPackets();
  }
}