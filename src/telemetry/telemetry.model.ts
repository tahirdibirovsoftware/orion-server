export interface ITelemetry {
  packetNumber: number;
  satelliteStatus: number;
  errorCode: string;
  missionTime: Date | string;
  pressure1: number;
  pressure2: number;
  altitude1: number;
  altitude2: number;
  altitudeDifference: number;
  descentRate: number;
  temp: number;
  voltageLevel: number;
  gps1Latitude: number;
  gps1Longitude: number;
  gps1Altitude: number;
  pitch: number;
  roll: number;
  yaw: number;
  LNLN: string;
  iotData: number;
  teamId: number;
}
