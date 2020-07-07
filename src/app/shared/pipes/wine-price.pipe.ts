import { Pipe, PipeTransform } from '@angular/core';
import { IWine } from '../interfaces/wine.interface';

@Pipe({
  name: 'winePrice'
})
export class WinePricePipe implements PipeTransform {

  transform(value: Array<IWine>, start: number, end: number): any {
    let newArray = [];
    if (value) {
      value.forEach(function (v) {
        if ((v.price >= start) && (v.price <= end)) {
          newArray.push(v);
        }
      })
    }
    return newArray;
  }

}
