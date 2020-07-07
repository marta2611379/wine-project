import { Pipe, PipeTransform } from '@angular/core';
import { IWine } from '../interfaces/wine.interface';

@Pipe({
  name: 'wineColor'
})
export class WineColorPipe implements PipeTransform {

  transform(value: Array<IWine>, color?: string): any {
    let newArray = [];
    if (value) {
      if ((color == undefined) || (color == '')) {
        return value;
      } else {
        value.forEach(function (v) {
          if (v.color == color) newArray.push(v);
        })
        return newArray;
      }
    }
  }
}
