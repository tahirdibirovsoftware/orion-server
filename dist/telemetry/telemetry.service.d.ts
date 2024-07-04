import { Pool } from 'pg';
import { ITelemetry } from './telemetry.model';
export declare class TelemetryService {
    private readonly pool;
    constructor(pool: Pool);
    addNewPacket: (packet: ITelemetry) => Promise<void>;
    getLatestPacket: () => Promise<ITelemetry | null>;
    getAllPackets: () => Promise<ITelemetry[]>;
    removeAllPackets: () => Promise<void>;
}
