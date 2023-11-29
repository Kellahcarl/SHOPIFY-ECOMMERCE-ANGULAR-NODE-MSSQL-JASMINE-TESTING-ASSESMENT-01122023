import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../types/productService';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId: string | null = null;
  product: Product[] = [];
  isLoading: boolean = true;
  cartItems: any[] = [];

  token = localStorage.getItem('token');

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authservice: AuthService,
    private router : Router
  ) {}

  ngOnInit() {
    // Extract the product ID from the route parameters
    this.route.params.subscribe((params) => {
      this.productId = params['id'];

      this.fetchProductDetails();
      this.loadCart();
    });

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

  async fetchProductDetails() {
    this.isLoading = true;
    if (!this.token) {
      console.error('Token not found.');
      return;
    }

    this.product = await this.productService.getProductById(
      this.productId!,
      this.token
    );
    this.isLoading = false;
    console.log(this.product);
  }

  loadCart() {
    const cartString = localStorage.getItem('cart');
    this.cartItems = cartString ? JSON.parse(cartString) : [];
    this.updateCartCount();
  }

  addToCart(product: Product) {
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
