import { Pipe, PipeTransform } from '@angular/core';
import { IWine } from '../interfaces/wine.interface';

@Pipe({
  name: 'wineName'
})
export class WineNamePipe implements PipeTransform {

  transform(value: Array<IWine>, name?: string): any {
    let newArray = [];
    if (value) {
      if ((name == undefined) || (name == '')) {
        return value;
      } else {
        value.forEach(function (v) {
          if (v.name == name) newArray.push(v);
        })
        return newArray;
      }
    }
  }
}
