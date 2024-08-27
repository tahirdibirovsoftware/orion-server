import { TelemetryService } from './telemetry.service';
import { ITelemetry } from './telemetry.model';
export declare class TelemetryController {
    private readonly telemetryService;
    constructor(telemetryService: TelemetryService);
    addNewPacket(packet: ITelemetry): Promise<{
        message: string;
    }>;
    getLatestPacket(): Promise<ITelemetry>;
    getAllPackets(): Promise<ITelemetry[]>;
    removeAllPackets(): Promise<void>;
}
