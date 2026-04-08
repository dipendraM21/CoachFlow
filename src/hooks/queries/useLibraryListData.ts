import { useInfiniteQuery } from '@tanstack/react-query';
import { LIBRARY_LIST_QUERY_KEY } from '../../constant/constant';
import { getLibraryListingApi } from '../../store/apis';
import { Batch, LibraryItem } from '../../types/batch.d';

// Transform API Library to UI Batch
const transformLibraryItem = (item: LibraryItem): Batch => {
  return {
    id: item._id,
    institute: {
      id: item._id,
      name: item.libraryName,
      logo: item.logo || undefined,
      location: {
        city: item.address.city,
        state: item.address.state,
      },
      isVerified: item.isVerified,
      phoneNumber: item.phone,
    },
    name: item.libraryName,
    subtitle: item.address.full, // Show full address in subtitle
    fees: item.monthlyFee,
    startDate: new Date().toISOString(),
    status: 'Current',
    mode: 'Offline',
    seatsLeft: 0,
    instituteIcon: 'graduation',
    instituteIconColor: { bg: '#F3F4F6', color: '#000' },
  };
};

export const useLibraryListData = ({ city, district }: { city?: string; district?: string }) => {
  return useInfiniteQuery({
    queryKey: [LIBRARY_LIST_QUERY_KEY, city, district],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getLibraryListingApi({
        page: pageParam,
        limit: 10,
        city,
        district,
      });
      
      return {
        ...response.data,
        libraries: response.data?.libraries || [],
      };
    },
    getNextPageParam: (lastPage: any) => {
      const { page, hasNextPage } = lastPage.pagination || {};
      return hasNextPage ? page + 1 : undefined;
    },
    select: data => {
      return {
        pages: data.pages.flatMap(page => (page.libraries || []).map(transformLibraryItem)),
        pageParams: data.pageParams,
      };
    },
  });
};
