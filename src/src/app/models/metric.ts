import { MetricType } from "./metric-type";
import { TelemetryDataBase } from "./telemetry-data-base";

export interface Metric extends TelemetryDataBase {
    type: MetricType,
    value: number,
    start: Date,
    end: Date,
    name: string
}