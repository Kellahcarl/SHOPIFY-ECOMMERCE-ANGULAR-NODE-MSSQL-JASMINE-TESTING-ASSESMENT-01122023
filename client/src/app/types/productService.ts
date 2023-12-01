export interface Product {
  title: string;
  product_id: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}

export interface createProduct {
  title: string;
  price: number;
  image: string;
  description: string;
  stock: number;
}
