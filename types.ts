export enum Category {
  NETWORKING = 'Networking',
  CLOUD = 'Cloud Computing',
  CYBERSECURITY = 'Cybersecurity',
}

export interface Packet {
  id: string;
  number: string; // e.g., "01", "14"
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  category: Category;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface Transition {
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