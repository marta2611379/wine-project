import { Component, OnInit } from '@angular/core';
import { WineService } from 'src/app/shared/services/wine.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrders } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  arrayOrders: Array<IOrders>;
  idOrder: string = '';
  constructor(private wineService: WineService,
    private firestore: AngularFirestore) {
    this.getAdminOrder();
  }

  ngOnInit() {
  }

  public checkboxClick(order): void {
    this.idOrder = order.id;
    this.firestore.collection('orders').doc(this.idOrder).update({
      status: order.status = !order.status
    }).then(function () {
      console.log("Document successfully edit!");
    }).catch(function (error) {
      console.error("Error editing document: ", error);
    });
  }

  public deleteOrder(order): void {
    this.firestore.collection('orders').doc(order.id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    })
  }

  public getAdminOrder(): void {
    this.wineService.getOrders().subscribe(order => (this.arrayOrders = order));
  }
}
