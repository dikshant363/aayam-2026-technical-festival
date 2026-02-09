

export interface NavItem {
  label: string;
  path: string;
}

export interface SponsorPackage {
  id: string;
  title: string;
  price: string;
  color: string;
  benefits: string[];
  highlight: boolean;
}

export type EventCategory = 'Computer' | 'Gaming' | 'Civil' | 'Electrical' | 'Chemical' | 'Robotics' | 'Non-Tech' | 'Mini Concert';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  image: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  phone?: string;
  email?: string;
  category: 'Faculty' | 'Sponsorship' | 'Organizing'; // Added category for filtering
}

export interface FaqItem {
  id: string; // Added ID for management
  question: string;
  answer: string;
  category: 'General' | 'Sponsorship' | 'Events' | 'Logistics';
}

export interface SponsorApplication {
  id: string;
  timestamp: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  package: string;
  budget: string;
  message?: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'rejected';
  notes?: string;
}

export interface ContactMessage {
  id: string;
  timestamp: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
}

export interface GalleryImage {
  id: string;
  src: string;
  title: string;
  year: '2025' | '2024' | '2023';
  category: 'Technical' | 'Gaming' | 'Cultural' | 'Workshops' | 'Crowd';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  lastLogin: number;
}