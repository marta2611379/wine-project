import { Pipe, PipeTransform } from '@angular/core';
import { IWine } from '../interfaces/wine.interface';
import { IBlog } from '../interfaces/blog.interface';
import { Wine } from '../classes/wine.model';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
// import { AngularFireModule } from '@angular/fire';
// import {angular } from 'rxjs';


@Pipe({
  name: 'wine',
  
})
export class WinePipe implements PipeTransform {

  transform(value: string): any {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);;
    }
  }
}
