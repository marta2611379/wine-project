import { Component, OnInit, Input, ChangeDetectionStrategy, Inject, HostListener, Output, EventEmitter } from '@angular/core';
import { IWine } from 'src/app/shared/interfaces/wine.interface';
import { WineService } from 'src/app/shared/services/wine.service';
import { IManufacturer } from 'src/app/shared/interfaces/manufacturer.interface';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { DOCUMENT } from '@angular/common';
import { IWines } from 'src/app/shared/interfaces/order.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ProductsComponent implements OnInit {
  filterColor: string;
  filterType: string;
  filterManufacturer: string;
  filterCountry: string;

  priceValStart: number = 0;
  priceValEnd: number = 10000;

  arrayManufacturers: Array<IManufacturer>;
  arrayCountries: Array<ICountry>;
  adminWines: Array<IWine> = [];

  public displayWine: boolean = true;
  public clickWine: string;
  public clickObj: IWine;

  page: number = 1;
  navIsFixed: boolean;
  ind: boolean;

  constructor(private wineService: WineService,
    @Inject(DOCUMENT) private document: Document) {
    this.getAdminWine();
    this.getAdminManufacturers();
    console.log(wineService.data);
    wineService.data = 3;
    this.toShoper();
  }

  ngOnInit() {

  };

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) { this.navIsFixed = false; }
  } scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }

  receiveFromChild(evnt) {
    this.displayWine = evnt;
    console.log(this.displayWine);
  }

  changeChildData() {
    this.displayWine = !this.displayWine;
    console.log(this.displayWine);
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
    localStorage.setItem('order', JSON.stringify(this.wineService.orders));
  }

  public wineComponent(wine, wineId): string {
    this.scrollToTop();
    this.clickWine = wineId;
    this.clickObj = wine;
    this.displayWine = !this.displayWine;
    return wineId;
  }

  public getAdminManufacturers(): void {
    this.wineService.getManufacturers().subscribe(manufacturer => (this.arrayManufacturers = manufacturer));
  }

  public getAdminCountries(): void {
    this.wineService.getCountry().subscribe(country => (this.arrayCountries = country));
  }

  public onChangePriceStart(event): void {
    this.priceValStart = event.target.value;
    if (this.priceValStart >= this.priceValEnd) {
      this.priceValEnd = 10000;
    }
  }

  public onChangePriceEnd(event): void {
    this.priceValEnd = event.target.value;
    if (this.priceValEnd <= this.priceValStart) {
      console.log('end', this.priceValEnd);
      console.log('end', this.priceValStart - 100);
      this.priceValStart = 0;
    }
  }

  public onChangeColor(event): void {
    this.filterColor = event.target.value;
  }

  public onChangeType(event): void {
    this.filterType = event.target.value;
  }

  public onChangeManufacturer(event): void {
    this.filterManufacturer = event.target.value;
  }

  public onChangeCountry(event): void {
    this.filterCountry = event.target.value;
  }

  public getAdminWine(): void {
    this.wineService.getWines().subscribe(wines => (this.adminWines = wines));
  }

  public toShoper(): void {
    this.ind = !this.ind;

  }


}


