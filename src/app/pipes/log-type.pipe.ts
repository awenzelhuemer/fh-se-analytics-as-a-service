import { Pipe, PipeTransform } from '@angular/core';
import { LogType } from '../models/log-type';

@Pipe({
  name: 'logType'
})
export class LogTypePipe implements PipeTransform {

  transform(value: LogType, ...args: unknown[]): string {
    switch (value) {
      case LogType.Error:
        return "Error";
      case LogType.Trace:
        return "Trace";
      case LogType.Warning:
        return "Warning";
      default:
        return "Unknown";
    }
  }

}
