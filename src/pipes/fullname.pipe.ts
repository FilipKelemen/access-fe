import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullname',
})
export class FullnamePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!value) return;
    return value.lastName + ' ' + value.firstName;
  }
}
