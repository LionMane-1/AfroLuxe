
export enum Page {
  LANDING = 'LANDING',
  SERVICES = 'SERVICES',
  SERVICE_AREA = 'SERVICE_AREA',
  ABOUT = 'ABOUT',
  LOGIN = 'LOGIN',
  BOOKING = 'BOOKING',
  CONTACT = 'CONTACT',
  BLOG = 'BLOG',
  BLOG_POST_TIME_AUDIT = 'BLOG_POST_TIME_AUDIT',
  ADMIN = 'ADMIN'
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number; // minutes
  image?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  quote: string;
  rating: number;
  platform: 'Google' | 'Trustpilot' | 'Yelp';
}

export interface NavItem {
  label: string;
  page: Page;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  is_guest?: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  date: string; // ISO date string
  time: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  paymentStatus: 'unpaid' | 'paid';
}
