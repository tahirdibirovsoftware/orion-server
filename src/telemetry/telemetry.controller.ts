import { Body, Controller, Get, Post, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { ITelemetry } from './telemetry.model';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  @Post('/')
  async addNewPacket(@Body() packet: ITelemetry) {
    try {
      await this.telemetryService.addNewPacket(packet);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/latest')
  async getLatestPacket() {
    try {
      return await this.telemetryService.getLatestPacket();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/')
  async getAllPackets() {
    try {
      return await this.telemetryService.getAllPackets();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/')
  async removeAllPackets() {
    try {
      await this.telemetryService.removeAllPackets();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
