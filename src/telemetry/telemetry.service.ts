import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import { ITelemetry } from './telemetry.model';
import { DatabaseException } from 'src/errors/database.exception';
import { retry } from 'src/utils/retry';
import { CircuitBreaker } from 'src/utils/circuit-breaker';

@Injectable()
export class TelemetryService {
  private readonly logger = new Logger(TelemetryService.name);
  private readonly circuitBreaker: CircuitBreaker;

  constructor(@Inject('POSTGRES_POOL') private readonly pool: Pool) {
    this.circuitBreaker = new CircuitBreaker(this.pool, {
      failureThreshold: 5,
      successThreshold: 2,
      timeout: 10000,
    });
  }

  private async executeQuery(query: string, values?: any[]): Promise<any> {
    return this.circuitBreaker.execute(async () => {
      return retry(
        async () => {
          const client = await this.pool.connect();
          try {
            return await client.query(query, values);
          } finally {
            client.release();
          }
        },
        {
          retries: 3,
          minTimeout: 1000,
          factor: 2,
        }
      );
    });
  }

  addNewPacket = async (packet: ITelemetry): Promise<void> => {
    const query = `
      INSERT INTO Telemetry (
        packetNumber, satelliteStatus, errorCode, missionTime, pressure1, pressure2,
        altitude1, altitude2, altitudeDifference, descentRate, temp, voltageLevel,
        gps1Latitude, gps1Longitude, gps1Altitude, pitch, roll, yaw, LNLN, iotData, teamId
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
      )
    `;

    const values = [
      packet.packetNumber,
      packet.satelliteStatus,
      packet.errorCode,
      packet.missionTime,
      packet.pressure1,
      packet.pressure2,
      packet.altitude1,
      packet.altitude2,
      packet.altitudeDifference,
      packet.descentRate,
      packet.temp,
      packet.voltageLevel,
      packet.gps1Latitude,
      packet.gps1Longitude,
      packet.gps1Altitude,
      packet.pitch,
      packet.roll,
      packet.yaw,
      packet.LNLN,
      packet.iotData,
      packet.teamId,
    ];

    try {
      await this.executeQuery(query, values);
    } catch (error) {
      this.logger.error(`Error inserting new telemetry packet: ${error.message}`, error.stack);
      throw new DatabaseException('Failed to insert new telemetry packet.');
    }
  };

  getLatestPacket = async (): Promise<ITelemetry | null> => {
    const query = `
      SELECT *
      FROM Telemetry
      ORDER BY packetId DESC
      LIMIT 1
    `;

    try {
      const result = await this.executeQuery(query);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      this.logger.error(`Error getting latest telemetry packet: ${error.message}`, error.stack);
      throw new DatabaseException('Failed to retrieve latest telemetry packet.');
    }
  };

  getAllPackets = async (): Promise<ITelemetry[]> => {
    const query = `
      SELECT *
      FROM Telemetry
      ORDER BY packetId ASC
    `;

    try {
      const result = await this.executeQuery(query);
      return result.rows;
    } catch (error) {
      this.logger.error(`Error getting all telemetry packets: ${error.message}`, error.stack);
      throw new DatabaseException('Failed to retrieve all telemetry packets.');
    }
  };

  removeAllPackets = async (): Promise<void> => {
    const query = `
      DELETE FROM Telemetry
    `;

    try {
      await this.executeQuery(query);
    } catch (error) {
      this.logger.error(`Error removing all telemetry packets: ${error.message}`, error.stack);
      throw new DatabaseException('Failed to remove all telemetry packets.');
    }
  };
}