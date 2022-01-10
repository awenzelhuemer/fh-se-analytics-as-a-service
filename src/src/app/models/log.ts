import { LogType } from "./log-type";
import { TelemetryDataBase } from "./telemetry-data-base";

export interface Log extends TelemetryDataBase {
    type: LogType,
    message: string
}