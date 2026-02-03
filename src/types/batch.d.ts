// Strict Feed Item Type
export interface BatchFeedItem {
  _id: string;
  name: string;
  shortDescription?: string;
  subject: string;
  targetExam: string;
  fees: number;
  mode: 'online' | 'offline';
  city: string;
  startDate: string;
  // added totalMonths
  totalMonths?: number;
  schedule?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  capacity: {
    total: number;
    enrolled: number;
  };
  rating: {
    average: number;
    count: number;
  };
  institute: {
    name: string;
    logo: string | null;
    tagline: string;
    city: string;
    isVerified: boolean;
  };
}

export interface Batch {
  id: string;
  institute: {
    id?: string;
    name: string;
    logo?: string;
    location: {
      city: string;
      state?: string;
    };
    isVerified?: boolean;
    phoneNumber?: string;
  };
  name: string;
  subtitle: string;
  shortDescription?: string;
  startDate: string;
  mode: string;
  fees?: string | number;
  seatsLeft: number;
  totalSeats?: number;
  // Optional details specific fields
  timing?: {
    start: string;
    end: string;
  };
  duration?: string;
  totalMonths?: number; // Added for duration display
  medium?: string;

  // UI specific
  instituteIcon?: 'graduation' | 'flask' | 'compass';
  instituteIconColor?: { bg: string; color: string };
  promoStatus?: string;
}

// API Response Type which mirrors the server data (Details)
export interface ApiBatch {
  _id: string;
  name: string;
  shortDescription?: string;
  subject?: string;
  targetExam?: string;
  schedule?: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  duration?: {
    startDate: string;
    endDate: string;
  };
  fees?: {
    amount: number;
    currency: string;
    paymentMode: string;
  };
  totalMonths?: number; // Added from API response
  mode?: string;
  city?: string;
  thumbnail?: string | null;
  capacity?: {
    total: number;
    enrolled: number;
  };
  rating?: {
    average: number;
    count: number;
  };
  institute: {
    _id: string;
    instituteName?: string;
    name?: string; // Support both naming conventions
    logo?: string | null;
    tagline?: string;
    isVerifiedByAdmin?: boolean;
    contact?: {
      phone: string;
      email: string;
    };
    address?: {
      city: string;
      state: string;
    };
  };
}

export interface GetBatchesResponse {
  data: {
    batches: BatchFeedItem[]; // Use FeedItem for list
    pagination: {
      page: number;
      hasNextPage: boolean;
    };
  };
}

export interface GetBatchDetailResponse {
  data: {
    batch: ApiBatch;
  };
}
