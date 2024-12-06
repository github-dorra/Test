import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPassword'
})
export class MaskPasswordPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value.replace(/./g, '*');
  }

}
