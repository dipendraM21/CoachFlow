import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  BATCH_DETAILS_QUERY_KEY,
  BATCHES_LIST_QUERY_KEY,
  INSTITUTE_DETAILS_QUERY_KEY,
} from '../../constant/constant';
import {
  getBatchDetailsByApi,
  getBatchListApi,
  getInstituteBatchesApi,
  getInstituteDetailsByApi,
} from '../../store/apis';
import {
  Academy,
  ApiInstitute,
  ApiInstituteBatch,
  GetInstituteBatchesPayload,
  GetInstituteDetailsResponse,
} from '../../types/academy';
import { Batch } from '../../types/batch';
import { ApiBatch, BatchFeedItem, ClassItem } from '../../types/batch.d';

// Helper to calculate months between two dates
const calculateMonths = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Basic validation
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();

  // Adjust for partial months if needed, but simple diff is usually sufficient for "X Months"
  return months <= 0 ? 0 : months;
};

// Helper to get batch status
const getBatchStatus = (
  startDate?: string,
  endDate?: string,
): 'Upcoming' | 'Current' | 'Completed' => {
  const now = new Date();
  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : null;

  if (start > now) return 'Upcoming';
  if (end && end < now) return 'Completed';
  return 'Current';
};

// Transform API Batch to UI Batch
const transformBatch = (apiBatch: ApiBatch): Batch => {
  return {
    id: apiBatch._id,
    institute: {
      id: apiBatch.institute._id,
      name:
        apiBatch.institute.instituteName ||
        apiBatch.institute.name ||
        'Unknown Institute',
      logo: apiBatch.institute.logo || undefined,
      location: {
        city: apiBatch.city || '',
        state: apiBatch.institute.address?.state || '',
      },
      phoneNumber: apiBatch.institute.contact?.phone || '',
    },
    name: apiBatch.name,
    subtitle: apiBatch.targetExam || '',
    startDate: apiBatch.duration?.startDate || new Date().toISOString(),
    status: getBatchStatus(
      apiBatch.duration?.startDate,
      apiBatch.duration?.endDate,
    ),
    timing: {
      start: apiBatch.schedule?.startTime || '',
      end: apiBatch.schedule?.endTime || '',
    },

    duration: apiBatch.totalMonths
      ? `${apiBatch.totalMonths} Months`
      : apiBatch.duration?.startDate && apiBatch.duration?.endDate
      ? `${calculateMonths(
          apiBatch.duration.startDate,
          apiBatch.duration.endDate,
        )} Months`
      : 'N/A',
    totalMonths:
      apiBatch.totalMonths ||
      (apiBatch.duration?.startDate && apiBatch.duration?.endDate
        ? calculateMonths(
            apiBatch.duration.startDate,
            apiBatch.duration.endDate,
          )
        : 0),
    seatsLeft:
      (apiBatch.capacity?.total || 0) - (apiBatch.capacity?.enrolled || 0),
    totalSeats: apiBatch.capacity?.total,
    fees: apiBatch.fees?.amount
      ? `₹${apiBatch.fees.amount.toLocaleString()}`
      : undefined,
    medium: apiBatch.subject || 'English', // User requested Medium -> Subject
    mode: apiBatch.mode
      ? apiBatch.mode.charAt(0).toUpperCase() + apiBatch.mode.slice(1)
      : 'Online', // Default or fallback
    instituteIcon: 'graduation', // Default
    instituteIconColor: { bg: '#F3F4F6', color: '#000' },
  };
};

interface UseBatchFeedParams {
  city?: string;
}

// Strict Feed Transformer
const transformFeedItem = (item: BatchFeedItem): Batch => {
  return {
    id: item._id,
    institute: {
      id:
        item.institute._id || (item.institute as unknown as { id?: string }).id,
      name: item.institute.name,
      logo: item.institute.logo || undefined,
      location: {
        city: item.institute.city,
      },
      isVerified: item.institute.isVerified,
    },
    name: item.name,
    subtitle: `${item.targetExam} • ${item.subject}`,
    shortDescription: item.shortDescription || '',
    startDate: item.startDate,
    status: getBatchStatus(item.startDate), // FeedItem lacks endDate usually
    mode: item.mode.charAt(0).toUpperCase() + item.mode.slice(1), // Title Case
    fees: item.fees,
    seatsLeft: Math.max(0, item.capacity.total - item.capacity.enrolled),
    totalSeats: item.capacity.total,
    totalMonths: item.totalMonths, // Added duration
    timing: item.schedule
      ? {
          start: item.schedule.startTime,
          end: item.schedule.endTime,
        }
      : undefined,
    medium: item.subject,
    instituteIcon: 'graduation', // Default fallback
    instituteIconColor: { bg: '#F3F4F6', color: '#000' },
  };
};

// Transform API Class to UI Batch
const transformClassItem = (item: ClassItem): Batch => {
  return {
    id: item._id,
    institute: {
      id: item._id, // Using class ID as institute ID if separate ID is missing
      name: item.className,
      logo: item.logo || undefined,
      location: {
        city: item.address.city,
        state: item.address.state,
      },
      isVerified: item.isVerified,
      phoneNumber: item.phone,
    },
    name: item.className,
    subtitle: item.address.full,
    startDate: new Date().toISOString(),
    status: 'Current',
    mode: 'Offline',
    seatsLeft: 0,
    instituteIcon: 'graduation',
    instituteIconColor: { bg: '#F3F4F6', color: '#000' },
    isSubscribed: item.isSubscribed,
  };
};

export const useBatchFeedData = ({ city }: UseBatchFeedParams) => {
  return useInfiniteQuery({
    queryKey: [...BATCHES_LIST_QUERY_KEY, city],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getBatchListApi({
        page: pageParam,
        limit: 10,
        city,
      });
      return response.data;
    },
    getNextPageParam: lastPage => {
      const { page, hasNextPage } = lastPage.pagination;
      return hasNextPage ? page + 1 : undefined;
    },
    select: data => {
      return {
        pages: data.pages.flatMap(page => page.classes.map(transformClassItem)),
        pageParams: data.pageParams,
      };
    },
  });
};

export const useBatchDetails = (id: string, enabled: boolean = true) => {
  return useQuery<ApiBatch, Error, Batch>({
    queryKey: [...BATCH_DETAILS_QUERY_KEY, id],
    queryFn: async () => {
      const response = await getBatchDetailsByApi(id);
      return response.data.batch; // Extract batch from data object
    },
    enabled: !!id && enabled,
    select: data => transformBatch(data),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};

// Transform API Institute Batch to UI Batch
export const transformApiBatchToUIBatch = (
  apiBatch: ApiInstituteBatch,
  institute: {
    id: string;
    name: string;
    logo?: string;
    location: { city: string; state: string };
    phoneNumber?: string;
  },
  uiStatus: 'Upcoming' | 'Current' | 'Completed' | 'All' = 'All',
): Batch => {
  const feesAmount =
    typeof apiBatch.fees === 'object'
      ? apiBatch.fees.amount
      : (apiBatch.fees as unknown as number);

  const totalMonths =
    apiBatch.duration?.totalMonths || apiBatch.durationMonths || 0;

  return {
    id: apiBatch._id,
    institute: {
      id: institute.id,
      name: institute.name,
      logo: institute.logo,
      location: institute.location,
      phoneNumber: institute.phoneNumber,
    },
    name: apiBatch.name,
    subtitle: apiBatch.shortDescription || apiBatch.targetExam || '',
    startDate: apiBatch.duration?.startDate || '',
    timing: {
      start: apiBatch.timing?.startTime || '',
      end: apiBatch.timing?.endTime || '',
    },
    fees: feesAmount || 0,
    totalMonths: totalMonths,
    duration: totalMonths ? `${totalMonths} Months` : 'N/A',
    status: uiStatus === 'All' ? 'Current' : uiStatus, // Default to current if all
    mode: apiBatch.mode
      ? apiBatch.mode.charAt(0).toUpperCase() + apiBatch.mode.slice(1)
      : 'Offline',
    seatsLeft: apiBatch.availableSeats || 0,
    totalSeats: apiBatch.capacity?.total || 0,
    instituteIcon: 'graduation',
    instituteIconColor: { bg: '#F3F4F6', color: '#000' },
  };
};

// Transform API Institute to UI Academy
const transformInstitute = (
  apiInstitute: ApiInstitute | undefined,
  batchesByStatus: GetInstituteDetailsResponse['data']['batchesByStatus'] | undefined,
): Academy => {
  const allBatches: Batch[] = [];

  const instituteInfo = {
    id: apiInstitute?._id || '',
    name:
      apiInstitute?.instituteName ||
      apiInstitute?.name ||
      'Unknown Institute',
    logo: apiInstitute?.logo || undefined,
    location: {
      city: apiInstitute?.address?.city || '',
      state: apiInstitute?.address?.state || '',
    },
    phoneNumber: apiInstitute?.contact?.phone,
  };

  const processBatches = (
    apiBatches: ApiInstituteBatch[] | undefined,
    uiStatus: 'Upcoming' | 'Current' | 'Completed',
  ) => {
    if (!apiBatches) return;
    apiBatches.forEach(apiBatch => {
      allBatches.push(
        transformApiBatchToUIBatch(apiBatch, instituteInfo, uiStatus),
      );
    });
  };

  if (batchesByStatus) {
    processBatches(batchesByStatus.upcoming, 'Upcoming');
    processBatches(batchesByStatus.ongoing, 'Current');
    processBatches(batchesByStatus.completed, 'Completed');
  }

  return {
    ...instituteInfo,
    description: apiInstitute?.description,
    email: apiInstitute?.contact?.email,
    batches: allBatches,
  };
};

export const useInstituteDetails = (id: string, enabled: boolean = true) => {
  return useQuery<GetInstituteDetailsResponse, Error, Academy>({
    queryKey: [...INSTITUTE_DETAILS_QUERY_KEY, id],
    queryFn: async () => {
      const response = await getInstituteDetailsByApi(id);
      return response;
    },
    enabled: !!id && enabled,
    select: response =>
      transformInstitute(response.data.institute, response.data.batchesByStatus),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to fetch paginated batches for a specific institute with filters
 */
export const useInstituteBatchesData = (payload: GetInstituteBatchesPayload) => {
  return useInfiniteQuery({
    queryKey: ['instituteBatches', payload.id, payload.filter],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getInstituteBatchesApi({
        ...payload,
        page: pageParam,
        limit: payload.limit || 10,
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
    enabled: !!payload.id,
    staleTime: 0,
  });
};
