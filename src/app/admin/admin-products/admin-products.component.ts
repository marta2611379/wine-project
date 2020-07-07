import { Component, OnInit } from '@angular/core';
import { WineService } from 'src/app/shared/services/wine.service';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AngularFireUploadTask, AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { IManufacturer } from 'src/app/shared/interfaces/manufacturer.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  name: string = '';
  country: string = '';
  color: string = '';
  type: string = '';
  idWine: string;
  price: number = null;
  manufacturer: string = '';
  about: string = '';

  nameEdit: string;
  countryEdit: string;
  colorEdit: string;
  typeEdit: string;
  priceEdit: number;
  manufacturerEdit: string;
  aboutEdit: string = '';

  adminWines: any = [];

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  productImage: string;
  state: any;

  arrayManufacturers: Array<IManufacturer>;
  arrayCountries: Array<any>;

  disabledAdd: boolean = true;
  disabledSave: boolean = true;

  constructor(
    private wineService: WineService,
    private prStorage: AngularFireStorage,
    private firestore: AngularFirestore) {
    this.getAdminWine();
    this.getAdminManufacturers();
    this.getAdminCountries();
  }

  ngOnInit() { }


  public disabledStatusAdd(): boolean {
    if ((this.name == '') || (this.country == '') || (this.about == '')|| (this.type == '') || (this.manufacturer == '') || (this.price == null) || (this.color == '') || (this.productImage == '')) {
      this.disabledAdd = true;
    } else {
      this.disabledAdd = false;
    }
    return this.disabledAdd;
  }

  public disabledStatusSave(): boolean {
    if ((this.nameEdit == '') || (this.countryEdit == '')
      || (this.typeEdit == '') || (this.manufacturerEdit == '')
      || (this.priceEdit == null) || (this.colorEdit == '')|| (this.aboutEdit == '')) {
      this.disabledSave = true;
    } else {
      this.disabledSave = false;
    }
    return this.disabledSave;
  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.prStorage.ref(`images/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => {
          this.urlImage = url;
          return this.productImage = url;
        })
      })
    ).subscribe();
  }

  refresh(): void {
    this.name = '';
    this.color = '';
    this.type = '';
    this.country = '';
    this.manufacturer = '';
    this.price = null;
  }

  public getAdminWine(): void {
    this.wineService.getWines().subscribe(wines => (this.adminWines = wines));
  }

  public getAdminManufacturers(): void {
    this.wineService.getManufacturers().subscribe(manufacturer => (this.arrayManufacturers = manufacturer));
  }

  public getAdminCountries(): void {
    this.wineService.getCountry().subscribe(country => (this.arrayCountries = country));

  }

  public addWine(): void {
    this.firestore.collection('wines').add({
      manufacturer: this.manufacturer,
      name: this.name,
      color: this.color,
      type: this.type,
      country: this.country,
      price: this.price,
      image: this.urlImage,
      about: this.about
    }).then(function () {
      console.log("Document successfully add!");

    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
    this.refresh();
  }

  public deleteWine(wine): void {
    this.firestore.collection('wines').doc(wine.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  public editWine(wine): void {
    this.nameEdit = wine.name;
    this.countryEdit = wine.country;
    this.typeEdit = wine.type;
    this.colorEdit = wine.color;
    this.priceEdit = wine.price;
    this.manufacturerEdit = wine.manufacturer;
    this.idWine = wine.id;
    this.aboutEdit = wine.about;
    this.urlImage = wine.image;
  }

  public saveEditWine(): void {
    this.firestore.collection('wines').doc(this.idWine).update({
      manufacturer: this.manufacturerEdit,
      name: this.nameEdit,
      color: this.colorEdit,
      type: this.typeEdit,
      country: this.countryEdit,
      price: this.priceEdit,
      image: this.urlImage,
      about: this.aboutEdit
    }).then(function () {
      console.log("Document successfully edit!");
    }).catch(function (error) {
      console.error("Error editing document: ", error);
    });
  }
}
