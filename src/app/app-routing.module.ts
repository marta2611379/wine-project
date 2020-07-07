import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminComponent } from './admin/admin.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { AdminBlogComponent } from './admin/admin-blog/admin-blog.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminManufacturerComponent } from './admin/admin-manufacturer/admin-manufacturer.component';
import { AdminCountryComponent } from './admin/admin-country/admin-country.component';
import { WineAboutComponent } from './pages/products/wine-about/wine-about.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'order', component: OrderComponent },
  {
    path: 'products', component: ProductsComponent, children: [
      { path: '', redirectTo: '/products', pathMatch: 'full' },
      { path: 'wine-about/:id', component: WineAboutComponent }
    ]
  },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: AdminProductsComponent },
      { path: 'blogs', component: AdminBlogComponent },
      { path: 'manufacturer', component: AdminManufacturerComponent },
      { path: 'country', component: AdminCountryComponent },
     { path: 'order', component: AdminOrdersComponent }

    ]
  },
  { path: 'contacts', component: ContactsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
