import { Component, OnInit } from '@angular/core';
import { WineService } from 'src/app/shared/services/wine.service';
import { IWine } from 'src/app/shared/interfaces/wine.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  arrHomeWine = []
  adminWines: Array<IWine> = []
  constructor(private wineService: WineService) {
    this.getAdminWine();
  }

  ngOnInit() {
  }


  public getAdminWine(): void {
    this.wineService.getWines().subscribe(wines =>
      this.arrHomeWine.push(
        wines[wines.length - 1],
        wines[wines.length - 2],
        wines[wines.length - 3]
      )
    )
  }
}
