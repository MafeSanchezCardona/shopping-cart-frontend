import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

import { Basket, Product, User } from '../types';

export const shoppingCartBackend = axios.create({
  baseURL: 'http://localhost:8080'
});

export function useUser(
  loginName: string,
  password: string,
  options: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>
): UseQueryResult<User> {
  return useQuery(
    ['login', loginName],
    async () => {
      const { data } = await shoppingCartBackend.get<User>(`/users/login`, {
        params: {
          loginName: loginName,
          password: password
        }
      });

      return data;
    },
    options
  );
}

export function useSearchProducts(
  productName?: string,
  type?: string,
  options?: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>
): UseQueryResult<Product[]> {
  return useQuery(
    ['products', productName],
    async () => {
      const { data } = await shoppingCartBackend.get<Product[]>(`/products`, {
        params: {
          productName: productName,
          type: type
        }
      });

      return data;
    },
    options
  );
}

export function useSearchAllProducts(
  options: Omit<UseQueryOptions<Product[]>, 'queryKey' | 'queryFn'>
): UseQueryResult<Product[]> {
  return useQuery(
    ['products'],
    async () => {
      const { data } = await shoppingCartBackend.get<Product[]>(`/products`);

      return data;
    },
    options
  );
}

export function useSearchCart(
  userId: number,
  options: Omit<UseQueryOptions<Basket[]>, 'queryKey' | 'queryFn'>
): UseQueryResult<Basket[]> {
  return useQuery(
    ['cart', userId],
    async () => {
      const { data } = await shoppingCartBackend.get<Basket[]>(`/basket/user`, {
        params: {
          userId: userId
        }
      });

      return data;
    },
    options
  );
}
