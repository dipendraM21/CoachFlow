import { Batch } from './batch';

export interface Academy {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  location: {
    city: string;
    state: string;
  };
  website?: string;
  phone?: string;
  email?: string;
  batches?: Batch[];
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

export interface GetInstituteDetailsResponse {
  data: {
    institute: ApiInstitute;
    batches: import('./batch').ApiBatch[];
  };
}
