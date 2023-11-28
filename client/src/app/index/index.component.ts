import { Component } from '@angular/core';
import { Product } from '../types/productService';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  isLoading: boolean = true;
  token = localStorage.getItem('token');
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts()
  }

  fetchProducts = async () => {
    this.isLoading = true;

    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    try {
      this.products = await this.productService.getAllProducts(this.token);

      this.isLoading = false;
      console.log(this.products);

    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };
}
