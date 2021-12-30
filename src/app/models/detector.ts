import { Action } from "./action";
import { IntervalDetector } from "./interval-detector";
import { MinMaxDetector } from "./min-max-detector";

export interface Detector {
    id: number,
    action: Action,
    metricName: string,
    interval: string,
    offset: string,
    activated: boolean,
    lastExecuted: Date,
    minMaxDetector?: MinMaxDetector,
    intervalDetector?: IntervalDetector
}