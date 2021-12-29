import { Pipe, PipeTransform } from '@angular/core';
import { NumberHelper } from '../components/utils/number-helper';
import { Timespan } from '../models/timespan';

@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {

  transform(value: Timespan, ...args: unknown[]): unknown {
    return `${NumberHelper.format(value.hours)}:${NumberHelper.format(value.minutes)}:${NumberHelper.format(value.seconds)}`;
  }
}
