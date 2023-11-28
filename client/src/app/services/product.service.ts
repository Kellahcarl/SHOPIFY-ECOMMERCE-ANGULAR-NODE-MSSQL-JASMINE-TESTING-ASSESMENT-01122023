import { Injectable } from '@angular/core';
import { Product, createProduct } from '../types/productService';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  private apiUrl = 'http://localhost:4100/product';

  async createProduct(productDetails: createProduct, token: string): Promise<any> {
    console.log(productDetails);

    const response = await fetch(`${this.apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(productDetails),
    });

    return await response.json();
  }

  async getAllProducts(token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async getProductById(product_id: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${product_id}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async updateProduct(productDetails: Product, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(productDetails),
    });

    return await response.json();
  }

  async deleteProductById(product_id: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${product_id}`, {
      method: 'DELETE',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }
}
