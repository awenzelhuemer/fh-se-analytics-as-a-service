import { AggregateOperation } from "./aggregate-operation";
import { CompareType } from "./compare-type";

export interface IntervalDetector {
    CompareType: CompareType,
    AggregateOperation: AggregateOperation,
    Threshold: number
}