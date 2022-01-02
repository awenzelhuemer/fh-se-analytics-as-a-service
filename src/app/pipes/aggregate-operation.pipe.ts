import { Pipe, PipeTransform } from '@angular/core';
import { AggregateOperation } from '../models/aggregate-operation';

@Pipe({
  name: 'aggregateOperation'
})
export class AggregateOperationPipe implements PipeTransform {

  transform(value: AggregateOperation, ...args: unknown[]): string {
    switch (value) {
      case AggregateOperation.Average:
        return "Average";
      case AggregateOperation.CurrentValue:
        return "Current value";
      case AggregateOperation.Max:
        return "Max value";
      case AggregateOperation.Min:
        return "Min value";
      case AggregateOperation.Sum:
        return "Sum";
      default:
        return "Unknown";
    }
  }

}
