import { Injectable } from '@angular/core';
import { Product, createProduct } from '../types/productService';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  private apiUrl = 'http://localhost:4100/product';

  async createProduct(tourDetails: createProduct, token: string): Promise<any> {
    console.log(tourDetails);

    const response = await fetch(`${this.apiUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(tourDetails),
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

  async getProductById(tourId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${tourId}`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }

  async updateProduct(tourDetails: Product, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(tourDetails),
    });

    return await response.json();
  }

  async deleteProductById(tourId: string, token: string): Promise<any> {
    const response = await fetch(`${this.apiUrl}/${tourId}`, {
      method: 'DELETE',
      headers: {
        token: token,
      },
    });

    return await response.json();
  }
}
