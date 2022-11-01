import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { shoppingCartBackend } from './queries';

import { queryClient } from '../query-client';
import { Basket, Product, User } from '../types';

export const useCreateUser = (): UseMutationResult<User, unknown, Partial<User>> => {
  return useMutation(
    async (payload: Partial<User>): Promise<User> => {
      const { data } = await shoppingCartBackend.post<User>('/users', payload);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['users']);
        queryClient.setQueryData<User>(['users', data.userId], () => data);
      }
    }
  );
};

export const useCreateProduct = (): UseMutationResult<Product, unknown, Partial<Product>> => {
  return useMutation(
    async (payload: Partial<Product>): Promise<Product> => {
      const { data } = await shoppingCartBackend.post<Product>('/products', payload);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['products']);
        queryClient.setQueryData<Product>(['products', data.id], () => data);
      }
    }
  );
};

export const useCreateBasket = (): UseMutationResult<Basket, unknown, Partial<Basket>> => {
  return useMutation(
    async (payload: Partial<Basket>): Promise<Basket> => {
      const { data } = await shoppingCartBackend.post<Basket>('/basket', payload);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['cart']);
        queryClient.setQueryData<Basket>(['cart', data.id], () => data);
      }
    }
  );
};
