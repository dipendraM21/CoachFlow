import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false, // Do not refetch on window focus
        refetchOnReconnect: false, // Do not refetch when reconnecting
        refetchOnMount: false, // Avoid refetch on component mount
        networkMode: 'online', // Make queries online only
        retry: false, // Do not retry failed requests
        retryDelay: 1000, // Set retry delay if retry is true (not needed since retry is false)
      },
      mutations: {
        retry: false, // Disable retries for mutations
        retryDelay: 1000, // Set delay for retry (not needed since retry is false)
      },
    },
  });
}
