import { Pool } from 'pg';
import { ITelemetry } from './telemetry.model';
export declare class TelemetryService {
    private readonly pool;
    private readonly logger;
    private readonly circuitBreaker;
    constructor(pool: Pool);
    private executeQuery;
    addNewPacket: (packet: ITelemetry) => Promise<void>;
    getLatestPacket: () => Promise<ITelemetry | null>;
    getAllPackets: () => Promise<ITelemetry[]>;
    removeAllPackets: () => Promise<void>;
}
