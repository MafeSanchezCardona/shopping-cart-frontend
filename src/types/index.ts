export type User = {
  userId: number;
  loginName: string;
  password: string;
};

export type Product = {
  id: number;
  name: string;
  type: 'Books' | 'Music' | 'Games';
  description: string;
};

export type Basket = {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  quantity: number;
};
