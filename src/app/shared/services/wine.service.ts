import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IWine } from '../interfaces/wine.interface';
import { IBlog } from '../interfaces/blog.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { IManufacturer } from '../interfaces/manufacturer.interface';
import { ICountry } from '../interfaces/country.interface';
import * as firebase from 'firebase';
import { IOrder, IWines, IOrders } from '../interfaces/order.interface';
import { Order } from '../classes/order.model';



@Injectable({
  providedIn: 'root'
})
export class WineService {
  private urlP: string;
  private urlB: string;
  db = firebase.firestore();
  manufacturer: Array<IManufacturer>;
  data: number = 1;
  orders: IOrder;
  wineArr: IWines[] = [];
  count: number;

  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore) {
    this.orders = JSON.parse(localStorage.getItem('order'));
    this.counterAllWines();
  }

  public counterAllWines(): number {
    this.count = 0;
    let temp = this.orders.wines;
    for (let i = 0; i < temp.length; i++) {
      this.count += temp[i].counter;
    }
    return this.count;
  }


  public getWines(): Observable<IWine[]> {
    return this.firestore.collection<IWine>('wines').snapshotChanges().pipe(
      map(actions => (actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))))
  }

  public getManufacturers(): Observable<IManufacturer[]> {
    return this.firestore.collection<IManufacturer>('manufacturers').snapshotChanges().pipe(
      map(actions => (actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))))
  }

  public getCountry(): Observable<ICountry[]> {
    return this.firestore.collection<ICountry>('countries').snapshotChanges().pipe(
      map(actions => (actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))))
  }

  public getBlogs(): Observable<IBlog[]> {
    return this.firestore.collection<IBlog>('blogs')
      .snapshotChanges()
      .pipe(
        map(actions => (actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
        )
      )
  }

  public getOrders(): Observable<IOrders[]> {
    return this.firestore.collection<IOrders>('orders')
      .snapshotChanges()
      .pipe(
        map(actions => (actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
        )
      )
  }

  public addWine(wine): Observable<Array<IWine>> {
    return this.http.post<Array<IWine>>(this.urlP, wine);
  };

  public updateWine(id, name): Observable<Array<IWine>> {
    return this.http.put<Array<IWine>>(`${this.urlP}/${id}`, name)
  };

  public deleteWine(id): Observable<Array<IWine>> {
    return this.http.delete<Array<IWine>>(`${this.urlP}/${id}`)
  };


  public addBlog(blog): Observable<Array<IBlog>> {
    return this.http.post<Array<IBlog>>(this.urlB, blog);
  };

  public updateBlog(id, name): Observable<Array<IBlog>> {
    return this.http.put<Array<IBlog>>(`${this.urlB}/${id}`, name)
  };

  public deleteBlog(id): Observable<Array<IBlog>> {
    return this.http.delete<Array<IBlog>>(`${this.urlB}/${id}`)
  };

}
