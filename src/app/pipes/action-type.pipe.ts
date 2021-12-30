import { Pipe, PipeTransform } from '@angular/core';
import { ActionType } from '../models/action-type';

@Pipe({
  name: 'actionType'
})
export class ActionTypePipe implements PipeTransform {

  transform(value: ActionType, ...args: unknown[]): string {
    switch (value) {
      case ActionType.Webhook:
        return "Webhook";
        case ActionType.Email:
          return "Email";
      default:
        return "Unknown";
    }
  }

}
