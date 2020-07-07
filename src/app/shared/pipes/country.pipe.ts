import { Pipe, PipeTransform } from '@angular/core';
import { IWine } from '../interfaces/wine.interface';

@Pipe({
  name: 'wineCountry'
})
export class CountryPipe implements PipeTransform {

  transform(value: Array<IWine>, country?: string): any {
    let newArray = [];
    if (value) {
      if ((country == undefined) || (country == '')) {
        return value;
      } else {
        value.forEach(function (v) {
          if (v.country == country) newArray.push(v);
        })
        return newArray;
      }
    }
  }
}
