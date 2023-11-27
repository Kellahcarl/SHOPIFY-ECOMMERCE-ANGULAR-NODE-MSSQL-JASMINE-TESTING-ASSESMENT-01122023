export interface Product {
  title: string;
  product_id: string;
  price: string;
  image: string;
  category: string;
  description: string;
  stock: number;
}

export interface createProduct {
  title: string;
  price: string;
  image: string;
  category: string;
  description: string;
  stock: number;
}
