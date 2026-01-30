export interface Batch {
  id: string;
  institute: {
    id: string;
    name: string;
    logo?: string;
    location: {
      city: string;
      state: string;
    };
  };
  name: string;
  subtitle?: string;
  startDate: string; // ISO date string
  timing: {
    start: string; // HH:mm format
    end: string; // HH:mm format
  };
  duration: string; // e.g., "18 Months", "12 Months"
  seatsLeft: number;
  totalSeats?: number;
  fees?: string; // e.g., "₹1,50,000 / year"
  promoStatus?: string;
  promoStatusColor?: 'success' | 'warning';
  medium?: string; // e.g., "English", "Hindi/English"
  instituteIcon?: 'graduation' | 'flask' | 'compass';
  instituteIconColor?: { bg: string; color: string };
}
