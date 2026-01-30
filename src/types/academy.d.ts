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
