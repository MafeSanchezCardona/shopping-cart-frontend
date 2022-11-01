import toast from 'react-hot-toast';

import { QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { Page } from './types';

function isPage(lastPage: unknown): lastPage is Page<unknown> {
  return !!(lastPage as Page<unknown>).meta;
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const { response } = error as AxiosError;
      if (response?.status === 404) {
        toast.error('Resource not found!');
      }
    }
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      getPreviousPageParam: (response) => {
        if (isPage(response)) {
          return response.meta.cursor?.before
            ? {
                beforeCursor: response.meta.cursor.before,
                size: response.meta.size
              }
            : false;
        }
      },
      getNextPageParam: (response) => {
        if (isPage(response)) {
          return response.meta.cursor?.next
            ? {
                nextCursor: response.meta.cursor.next,
                size: response.meta.size
              }
            : false;
        }
      }
    }
  }
});
