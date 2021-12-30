import { AggregateOperation } from "./aggregate-operation";
import { CompareType } from "./compare-type";

export interface IntervalDetector {
    compareType: CompareType,
    aggregateOperation: AggregateOperation,
    threshold: number
}