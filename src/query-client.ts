import toast from 'react-hot-toast';

import { QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
      refetchOnWindowFocus: false
    }
  }
});
