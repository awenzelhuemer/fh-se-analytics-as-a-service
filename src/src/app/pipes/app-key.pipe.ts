import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appKey'
})
export class AppKeyPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace(new RegExp('[0-9a-zA-Z]', 'g'), '*');
  }

}
