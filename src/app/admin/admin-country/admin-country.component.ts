import { Component, OnInit } from '@angular/core';
import { ICountry } from 'src/app/shared/interfaces/country.interface';
import { WineService } from 'src/app/shared/services/wine.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-country',
  templateUrl: './admin-country.component.html',
  styleUrls: ['./admin-country.component.css']
})
export class AdminCountryComponent implements OnInit {
  adminCountry: string = '';
  arrayCountries: Array<ICountry>;
  countryEdit: string = '';
  idCountry: string;

  disabledAdd: boolean = true;
  disabledSave: boolean = true;


  constructor(
    private wineService: WineService,
    private firestore: AngularFirestore) {
    this.getAdminCountry();
  }

  ngOnInit() {


  }

  public disabledStatusAdd(): boolean {
    if ((this.adminCountry == '' || undefined)) {
      this.disabledAdd = true;
    } else if (this.adminCountry.length > 2) {
      this.disabledAdd = false;
    }
    return this.disabledAdd;
  }


  public disabledStatusSave(): boolean {
    if ((this.countryEdit == '' || undefined)) {
      this.disabledSave = true;
    } else if (this.countryEdit.length > 2) {
      this.disabledSave = false;
    }
    return this.disabledSave;
  }

  refresh(): void {
    this.adminCountry = '';
  }

  public getAdminCountry(): void {
    this.wineService.getCountry().subscribe(country => (this.arrayCountries = country));
  }

  public addCountry(): void {
    this.firestore.collection('countries').add({
      country: this.adminCountry,
    }).then(function () {
      console.log("Document successfully add!");
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
    this.refresh();
  }

  public deleteCountry(country): void {
    this.firestore.collection('countries').doc(country.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    })
  }

  public editCountry(country): void {
    this.countryEdit = country.country;
    this.idCountry = country.id;
  }

  public saveEditCountry(): void {
    this.firestore.collection('countries').doc(this.idCountry).update({
      country: this.countryEdit
    }).then(function () {
      console.log("Document successfully edit!");
    }).catch(function (error) {
      console.error("Error editing document: ", error);
    });
  }
}
