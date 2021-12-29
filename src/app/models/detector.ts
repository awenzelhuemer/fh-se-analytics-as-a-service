import { Action } from "./action";
import { IntervalDetector } from "./interval-detector";
import { MinMaxDetector } from "./min-max-detector";
import { Timespan } from "./timespan";

export interface Detector {
    action: Action,
    metricName: string,
    interval: Timespan,
    offset: Timespan,
    activated: boolean,
    lastExecuted: Date,
    minMaxDetector?: MinMaxDetector,
    intervalDetector?: IntervalDetector
}