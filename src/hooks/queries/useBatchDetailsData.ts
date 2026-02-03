import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  BATCH_DETAILS_QUERY_KEY,
  BATCHES_LIST_QUERY_KEY,
  INSTITUTE_DETAILS_QUERY_KEY,
} from '../../constant/constant';
import {
  getBatchDetailsByApi,
  getBatchListApi,
  getInstituteDetailsByApi,
} from '../../store/apis';
import { Batch } from '../../types/batch';
import { ApiBatch, BatchFeedItem } from '../../types/batch.d';

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
    timing: {
      start: apiBatch.schedule?.startTime || '',
      end: apiBatch.schedule?.endTime || '',
    },

    duration: apiBatch.totalMonths ? `${apiBatch.totalMonths} Months` : 'N/A',
    totalMonths: apiBatch.totalMonths,
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
        pages: data.pages.flatMap(page => page.batches.map(transformFeedItem)),
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

import {
  Academy,
  ApiInstitute,
  GetInstituteDetailsResponse,
} from '../../types/academy';

// Transform API Institute to UI Academy
// Transform API Institute to UI Academy
const transformInstitute = (
  apiInstitute: ApiInstitute,
  apiBatches: ApiBatch[],
): Academy => {
  const batches: Batch[] = apiBatches.map(apiBatch => {
    // Construct a full ApiBatch-like object or directly transform to Batch
    // We'll treat apiBatch as Partial<ApiBatch> effectively since it lacks 'institute'
    return {
      id: apiBatch._id,
      institute: {
        id: apiInstitute._id,
        name:
          apiInstitute.instituteName ||
          apiInstitute.name ||
          'Unknown Institute',
        logo: apiInstitute.logo || undefined,
        location: {
          city: apiBatch.city || apiInstitute.address?.city || '',
          state: apiInstitute.address?.state || '',
        },
        phoneNumber: apiInstitute.contact?.phone,
      },
      name: apiBatch.name,
      subtitle: apiBatch.targetExam || '',
      startDate: apiBatch.duration?.startDate || new Date().toISOString(),
      timing: {
        start: apiBatch.schedule?.startTime || '',
        end: apiBatch.schedule?.endTime || '',
      },

      duration: apiBatch.totalMonths ? `${apiBatch.totalMonths} Months` : 'N/A',
      totalMonths: apiBatch.totalMonths,
      seatsLeft:
        (apiBatch.capacity?.total || 0) - (apiBatch.capacity?.enrolled || 0),
      totalSeats: apiBatch.capacity?.total,
      fees: apiBatch.fees?.amount
        ? `₹${apiBatch.fees.amount.toLocaleString()}`
        : undefined,
      medium: apiBatch.subject || 'English',
      mode: apiBatch.mode
        ? apiBatch.mode.charAt(0).toUpperCase() + apiBatch.mode.slice(1)
        : 'Online',
      instituteIcon: 'graduation',
      instituteIconColor: { bg: '#F3F4F6', color: '#000' },
    };
  });

  return {
    id: apiInstitute._id,
    name:
      apiInstitute.instituteName || apiInstitute.name || 'Unknown Institute',
    logo: apiInstitute.logo || undefined,
    description: apiInstitute.description,
    location: {
      city: apiInstitute.address?.city || '',
      state: apiInstitute.address?.state || '',
    },
    phone: apiInstitute.contact?.phone,
    email: apiInstitute.contact?.email,
    batches: batches,
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
      transformInstitute(response.data.institute, response.data.batches),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });
};
