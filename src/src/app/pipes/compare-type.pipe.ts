import { Pipe, PipeTransform } from '@angular/core';
import { CompareType } from '../models/compare-type';

@Pipe({
  name: 'compareType'
})
export class CompareTypePipe implements PipeTransform {

  transform(value: CompareType, ...args: unknown[]): string {
    switch (value) {
      case CompareType.Greater:
        return ">";
      case CompareType.Smaller:
        return "<";
      default:
        return "Unknown";

    }
  }

}
