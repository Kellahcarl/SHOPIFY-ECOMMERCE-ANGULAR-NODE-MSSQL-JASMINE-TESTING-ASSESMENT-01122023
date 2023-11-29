import { Component, OnInit } from '@angular/core';
import { Product } from '../types/productService';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  searchTerms: string = '';

  isLoading: boolean = true;
  token = localStorage.getItem('token');
  cartItems: any[] = [];

  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private authservice: AuthService,
    private router : Router
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.loadCart();
    this.isAuthenticated();
  }
  isAuthenticated = () => {
    if (!this.authservice.isAuthenticated()) {
    this.router.navigate(['/login']);
    }
  };

  logout() {
    this.authservice.logout();
  }

  loadCart() {
    const cartString = localStorage.getItem('cart');
    this.cartItems = cartString ? JSON.parse(cartString) : [];
    this.updateCartCount();
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
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  };

  clickAddToCart(product: Product) {
    const cartString = localStorage.getItem('cart');
    const cartItems = cartString ? JSON.parse(cartString) : [];

    const existingItem = cartItems.find(
      (item: any) => item.product_id === product.product_id
    );

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      }
    } else {
      const cartProduct = {
        product_id: product.product_id,
        image: product.image,
        name: product.title,
        price: product.price,
        quantity: 1,
      };

      cartItems.push(cartProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    this.updateCartCount();
    this.updateCartTotal();
  }

  updateCartCount() {
    const cartString = localStorage.getItem('cart');
    const cartItems = cartString ? JSON.parse(cartString) : [];
    const distinctItemCount = new Set(
      cartItems.map((item: Product) => item.product_id)
    ).size;

    const cartCountElement = document.querySelector('.count-icon');
    if (cartCountElement) {
      cartCountElement.textContent = distinctItemCount.toString();
    }
  }

  updateCartTotal() {
    const cartString = localStorage.getItem('cart');
    this.cartItems = cartString ? JSON.parse(cartString) : [];

    this.updateCartCount();
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  increaseQuantity(item: any) {
    if (item.quantity < 20) {
      item.quantity += 1;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.updateCartTotal();
    }
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.updateCartTotal();
    }
  }

  removeFromCart(item: any) {
    const index = this.cartItems.findIndex(
      (cartItem: any) => cartItem.product_id === item.product_id
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.updateCartTotal();
    }
    this.updateCartCount();
  }
}
