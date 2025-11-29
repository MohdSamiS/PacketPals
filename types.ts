export enum Category {
  NETWORKING = 'Networking',
  CLOUD = 'Cloud Computing',
  CYBERSECURITY = 'Cybersecurity',
  IOT = 'IoT & Electronics',
}


export interface Packet {
  id: string;
  slug: string;
  number: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  read_time_minutes: number;
  published_at: string;
  cover_image_url?: string | null;
  status: string; // 'draft' | 'published' | 'archived'
}

export interface Transmission {
  id: string;
  number: string; // e.g., "021"
  title: string;
  description: string;
  date: string;
  type: 'Security Alert' | 'Platform Update' | 'Industry News';
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'IP Tools' | 'Diagnostics' | 'Cloud' | 'Security';
  icon: string; // Lucide icon name mapping
  status: 'Active' | 'Beta' | 'Coming Soon';
}

export interface SocialLink {
  name: string;
  url: string;
  iconPath: string;
  viewBox?: string;
}