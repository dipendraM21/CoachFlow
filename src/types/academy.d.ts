import { Batch } from './batch';

export interface Academy {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  location: {
    city: string;
    state: string;
    fullAddress?: string;
  };
  website?: string;
  phone?: string;
  email?: string;
  batches?: Batch[]; // For backward compatibility if needed
}

export interface GetInstituteBatchesPayload {
  id: string;
  page?: number;
  limit?: number;
  filter?: 'all' | 'upcoming' | 'ongoing' | 'completed';
}

export interface GetInstituteBatchesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    batches: ApiInstituteBatch[];
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

export interface ApiInstitute {
  _id: string;
  name: string;
  instituteName?: string;
  description?: string;
  logo?: string | null;
  coverImage?: string | null;
  address?: {
    city: string;
    state: string;
    fullAddress?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
  rating?: {
    average: number;
    count: number;
  };
  isVerifiedByAdmin?: boolean;
}

export interface ApiInstituteBatch {
  _id: string;
  name: string;
  shortDescription?: string;
  subject?: string;
  targetExam?: string;
  mode?: 'online' | 'offline';
  fees?: {
    amount: number;
    currency: string;
  };
  timing?: {
    startTime: string;
    endTime: string;
  };
  duration?: {
    startDate: string;
    endDate: string;
    totalMonths: number;
  };
  capacity?: {
    total: number;
    enrolled: number;
  };
  availableSeats?: number;
  durationMonths?: number; // Keep for fallback/compatibility
}

export interface GetInstituteDetailsResponse {
  data: {
    institute: ApiInstitute;
    batchesByStatus: {
      upcoming: ApiInstituteBatch[];
      ongoing: ApiInstituteBatch[];
      completed: ApiInstituteBatch[];
    };
    counts: {
      upcoming: number;
      ongoing: number;
      completed: number;
      total: number;
    };
  };
}

export interface PublicInstituteProfile {
  _id: string;
  user: string;
  instituteName: string;
  entityType: 'institute';
  ownerName: string;
  email: string;
  logo: string;
  coverImage: string;
  description: string;
  tagline: string;
  address: {
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    alternatePhone: string;
    email: string;
    website: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    linkedin: string;
  };
  subjectsOffered: string[];
  targetExams: string[];
  establishedYear: number;
  isVerifiedByAdmin: boolean;
  isFeatured: boolean;
  facilities: string[];
  monthlyFee: number;
  rating: {
    average: number;
    count: number;
  };
  profileCompletion: number;
}

export interface GetPublicInstituteProfileResponse {
  success: boolean;
  data: {
    profile: PublicInstituteProfile;
  };
}
