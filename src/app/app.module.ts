import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminComponent } from './admin/admin.component';

import { PipesComponent } from './shared/pipes/pipes.component';

import { DirectivesComponent } from './shared/directives/directives.component';

import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminManufacturerComponent } from './admin/admin-manufacturer/admin-manufacturer.component';

// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { WinePipe } from './shared/pipes/wine.pipe';
import { WineColorPipe } from './shared/pipes/wine-color.pipe';

import { WineNamePipe } from './shared/pipes/wine-name.pipe';
import { WinePricePipe } from './shared/pipes/wine-price.pipe';
import { WineTypePipe } from './shared/pipes/wine-type.pipe';
import { WineManufacturerPipe } from './shared/pipes/wine-manufacturer.pipe';
import { AdminCountryComponent } from './admin/admin-country/admin-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  MatInputModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule
} from "@angular/material";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { WineAboutComponent } from './pages/products/wine-about/wine-about.component';


import {NgxPaginationModule} from 'ngx-pagination'; 

import * as firebase from 'firebase';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

firebase.initializeApp(environment.firebase);






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    BlogComponent,
    HomeComponent,
    OrderComponent,
    ProductsComponent,
    AdminComponent,

    PipesComponent,
    DirectivesComponent,
    ContactsComponent,
    AdminBlogComponent,
    AdminProductsComponent,
    WinePipe,
    WineColorPipe,
    WineNamePipe,
    WinePricePipe,
    WineTypePipe,
    WineManufacturerPipe,
    AdminManufacturerComponent,
    AdminCountryComponent,
    WineAboutComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    NgImageSliderModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'final-project'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, BrowserAnimationsModule,
    MatSliderModule,
    MatPaginatorModule,
    MatInputModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule,
    MatGridListModule,MatCardModule,
    NgxPaginationModule// imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
