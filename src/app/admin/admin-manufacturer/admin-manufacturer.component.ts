import { Component, OnInit } from '@angular/core';
import { WineService } from 'src/app/shared/services/wine.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IManufacturer } from 'src/app/shared/interfaces/manufacturer.interface';

@Component({
  selector: 'app-admin-manufacturer',
  templateUrl: './admin-manufacturer.component.html',
  styleUrls: ['./admin-manufacturer.component.css']
})
export class AdminManufacturerComponent implements OnInit {
  adminManufacturer: string = '';
  arrayManufacturers: Array<IManufacturer>=[];

  manufacturerEdit: string='';
  idManufacturer: string;
  disabledAdd: boolean = true;
  disabledSave: boolean = true;

  constructor(
    private wineService: WineService,
    private firestore: AngularFirestore) {
    this.getAdminManufacturers();
  }

  ngOnInit() {

  }
  refresh(): void {
    this.adminManufacturer = '';
  }
  public disabledStatusAdd(): boolean {
    if ((this.adminManufacturer == '' || undefined)) {
      this.disabledAdd = true;
    } else if (this.adminManufacturer.length > 2) {
      this.disabledAdd = false;
    }
    return this.disabledAdd;
  }


  public disabledStatusSave(): boolean {
    if ((this.manufacturerEdit == '' || undefined)) {
      this.disabledSave = true;
    } else if (this.manufacturerEdit.length > 2) {
      this.disabledSave = false;
    }
    return this.disabledSave;
  }

  public getAdminManufacturers(): void {
    this.wineService.getManufacturers().subscribe(manufacturer => (this.arrayManufacturers = manufacturer));
  }

  public addManufacturer(): void {
    this.firestore.collection('manufacturers').add({
      manufacturer: this.adminManufacturer,
    }).then(function () {
      console.log("Document successfully add!");
    }).catch(function (error) {
      console.error("Error adding document: ", error);
    });
    this.refresh();
  }

  public deleteManufacturer(manufacturer): void {
    this.firestore.collection('manufacturers').doc(manufacturer.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    })
  }

  public editManufacturer(manufacturer): void {
    this.manufacturerEdit = manufacturer.manufacturer;
    this.idManufacturer = manufacturer.id;
  }

  public saveEditManufacturer(): void {
    this.firestore.collection('manufacturers').doc(this.idManufacturer).update({
      manufacturer: this.manufacturerEdit
    }).then(function () {
      console.log("Document successfully edit!");
    }).catch(function (error) {
      console.error("Error editing document: ", error);
    });
  }
}
