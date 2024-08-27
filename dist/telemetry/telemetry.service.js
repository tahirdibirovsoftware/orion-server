"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const database_exception_1 = require("../errors/database.exception");
let TelemetryService = class TelemetryService {
    constructor(pool) {
        this.pool = pool;
        this.addNewPacket = async (packet) => {
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
                await this.pool.query(query, values);
            }
            catch (error) {
                console.error('Error inserting new telemetry packet:', error);
                throw new database_exception_1.DatabaseException('Failed to insert new telemetry packet.');
            }
        };
        this.getLatestPacket = async () => {
            const query = `
      SELECT *
      FROM Telemetry
      ORDER BY packetId DESC
      LIMIT 1
    `;
            try {
                const result = await this.pool.query(query);
                return result.rows.length > 0 ? result.rows[0] : null;
            }
            catch (error) {
                console.error('Error getting latest telemetry packet:', error);
                throw new database_exception_1.DatabaseException('Failed to retrieve latest telemetry packet.');
            }
        };
        this.getAllPackets = async () => {
            const query = `
      SELECT *
      FROM Telemetry
      ORDER BY packetId ASC
    `;
            try {
                const result = await this.pool.query(query);
                return result.rows;
            }
            catch (error) {
                console.error('Error getting all telemetry packets:', error);
                throw new database_exception_1.DatabaseException('Failed to retrieve all telemetry packets.');
            }
        };
        this.removeAllPackets = async () => {
            const query = `
      DELETE FROM Telemetry
    `;
            try {
                await this.pool.query(query);
            }
            catch (error) {
                console.error('Error removing all telemetry packets:', error);
                throw new database_exception_1.DatabaseException('Failed to remove all telemetry packets.');
            }
        };
    }
};
exports.TelemetryService = TelemetryService;
exports.TelemetryService = TelemetryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('POSTGRES_POOL')),
    __metadata("design:paramtypes", [pg_1.Pool])
], TelemetryService);
//# sourceMappingURL=telemetry.service.js.map