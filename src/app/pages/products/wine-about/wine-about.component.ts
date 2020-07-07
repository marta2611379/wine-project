import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IWine } from 'src/app/shared/interfaces/wine.interface';
import { WineService } from 'src/app/shared/services/wine.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { IWines } from 'src/app/shared/interfaces/order.interface';




@Component({
  selector: 'app-wine-about',
  templateUrl: './wine-about.component.html',
  styleUrls: ['./wine-about.component.css']
})
export class WineAboutComponent implements OnInit {
  @Input() clickWineNew: string;
  @Input() clickObjNew: IWine;
  @Input() public displayWine: boolean;
  @Output() public outToParent = new EventEmitter();

  sendToParent() {
    this.outToParent.emit(this.displayWine = true);
  }


  constructor(private wineService: WineService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.getW();
  }


  public getW() {
    console.log(this.clickWineNew);
    console.log(this.clickObjNew);
  }
  public orders(wine) {
    let index = 0;
    if (this.wineService.wineArr.length == 0) {
      this.wineService.wineArr.push(
        {
          wine: wine,
          counter: 1
        }
      )
    } else {
      this.wineService.wineArr.forEach(function (v: IWines) {
        if (v.wine.id == wine.id) {
          v.counter++;
          index--;
        } else {
          index++;
        }
      })
      if (index == this.wineService.wineArr.length) {
        this.wineService.wineArr.push(
          {
            wine: wine,
            counter: 1
          }
        )
      }
    };
    this.wineService.orders =
      {
        id: wine.id,
        wines: this.wineService.wineArr
      }
      localStorage.setItem('order', JSON.stringify( this.wineService.orders));
  }





}
