import { Pipe, PipeTransform } from '@angular/core';
import { IWine } from '../interfaces/wine.interface';

@Pipe({
  name: 'wineType'
})
export class WineTypePipe implements PipeTransform {

  transform(value: Array<IWine>, type?: string): any {
    let newArray = [];
    if (value) {
      if ((type == undefined) || (type == '')) {
        return value;
      } else {
        value.forEach(function (v) {
          if (v.type == type) newArray.push(v);
        })
        return newArray;
      }
    }
  }
}
