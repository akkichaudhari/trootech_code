import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductFormComponent } from './product/product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    CategoryComponent,
    CategoryFormComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    ModalModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
