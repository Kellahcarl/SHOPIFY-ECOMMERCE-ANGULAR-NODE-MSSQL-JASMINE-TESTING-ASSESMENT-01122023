import { Component } from '@angular/core';
import { Product } from '../types/productService';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  isLoading: boolean = true;
  token = localStorage.getItem('token');

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchproducts();
  }

  fetchproducts = async () => {
    this.isLoading = true;

    if (!this.token) {
      console.error('Token not found.');
      return;
    }
    try {
      this.products = await this.productService.getAllProducts(this.token);
      console.log(this.products);

      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = true;
    }
  };

  clickAddToCart = (product_id: string) => {
    console.log(product_id);
  }
}
