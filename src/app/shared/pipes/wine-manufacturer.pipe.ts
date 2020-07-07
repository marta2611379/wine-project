import { Pipe, PipeTransform } from '@angular/core';
import { IWine } from '../interfaces/wine.interface';

@Pipe({
  name: 'wineManufacturer'
})
export class WineManufacturerPipe implements PipeTransform {

  transform(value: Array<IWine>, manufacturer?: string): any {
    let newArray = [];
    if (value) {
      if ((manufacturer == undefined) || (manufacturer == '')) {
        return value;
      } else {
        value.forEach(function (v) {
          if (v.manufacturer == manufacturer) newArray.push(v);          
        })
        return newArray;
      }
    }
  }

}
