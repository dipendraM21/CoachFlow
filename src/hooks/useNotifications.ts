import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import NetworkClient from '../utils/NetworkClient';

// Interfaces based on provided API structure
export interface Notification {
  _id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  readAt?: string;
  institute?: {
    _id: string;
    instituteName: string;
    logo?: string;
  };
  batch?: {
    _id: string;
    name: string;
    subject?: string;
    status?: string;
  };
  createdAt: string;
  updatedAt: string;
  data?: any; // For backward compatibility if needed
}

export interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    notifications: Notification[];
    unreadCount: number;
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface MarkReadResponse {
  success: boolean;
  data: {
    notification: Notification;
  };
}

/**
 * Hook to fetch notifications with pagination
 */
export const useGetNotifications = () => {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await NetworkClient.get<NotificationResponse>(
        `/students/notifications?page=${pageParam}&limit=20`,
      );
      return response.data;
    },
    getNextPageParam: lastPage => {
      const { pagination } = lastPage;
      return pagination.hasNextPage ? pagination.page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};

/**
 * Hook to mark a single notification as read
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await NetworkClient.patch(
        `/students/notifications/${id}/read`,
        {},
      );
    },
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      // Snapshot the previous value
      const previousNotifications = queryClient.getQueryData(['notifications']);

      // Optimistically update to the new value
      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            notifications: page.notifications.map((n: any) =>
              n._id === id ? { ...n, read: true } : n,
            ),
          })),
        };
      });

      // Return a context object with the snapshotted value
      return { previousNotifications };
    },
    onError: (err, id, context) => {
      // Rollback to the previous value if the mutation fails
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ['notifications'],
          context.previousNotifications,
        );
      }
    },
    onSettled: () => {
      // Always refetch after error or success to keep server sync
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

/**
 * Hook to mark all notifications as read
 */
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await NetworkClient.post('/students/notifications/read-all', {});
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });
      const previousNotifications = queryClient.getQueryData(['notifications']);

      queryClient.setQueryData(['notifications'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            notifications: page.notifications.map((n: any) => ({
              ...n,
              read: true,
            })),
          })),
        };
      });

      return { previousNotifications };
    },
    onError: (err, variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ['notifications'],
          context.previousNotifications,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
