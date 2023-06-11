import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (res:any) => {
        this.products = res.data;
      },
      (error: any) => {
        console.error('Error loading products:', error);
      }
    );
  }
}
