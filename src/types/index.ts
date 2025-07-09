export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  technologies: string[];
  image?: string;
  images?: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  status: ProjectStatus;
  startDate?: string; // ISO date string
}

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'archived';

export type ProjectCategory = 'all' | 'frontend' | 'fullstack' | 'mobile' | 'devops' | 'backend' | 'data-science' | 'devtools' | 'game-development' | 'ai-ml' | 'tools-libraries' | 'other' | 'featured';

export interface ProjectFilter {
  category: ProjectCategory;
  searchTerm?: string;
  sortBy?: 'title' | 'date'/*  | 'popularity' */;
  order?: 'asc' | 'desc';
}

export interface Skill {
  name: string;
  level?: number; // 1-5
  category: 'language' | 'framework' | 'tool' | 'cloud' | 'database' | 'other';
  description?: string | null;
  icon?: string | null;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Statistics {
  yearsOfExperience: number;
  projectsCompleted: number;
  happyClients: number;
  coffeeConsumed: string; // e.g., "∞" or a number
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    wonderfuldev?: string;
    youtube?: string;
    facebook?: string;
    whatsapp?: string;
    telegram?: string;
    discord?: string;
    tiktok?: string;
    twitch?: string;
    stackoverflow?: string;
    reddit?: string;
    hackernews?: string;
    codepen?: string;
    devto?: string;
    medium?: string;
    professional?: string;
    website?: string;
  };
  statistics?: Statistics;
  journey?: string[];
}

export interface Role {
  title: string;
  company: string;
  duration?: string; // e.g., "2020 - Present"
  description: string;
}

export interface Career {
  yearsOfExperience: number;
  roles?: Role[];
}

export interface PersonalInfoWithCareer extends PersonalInfo {
  career?: Career;
}

export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  creator?: string;
  metadataBase?: URL;
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
    locale?: string;
    type?: 'website' | 'article' | 'profile';
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    title: string;
    description: string;
    creator?: string;
    images?: string[];
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      'max-video-preview'?: number | '-1';
      'max-image-preview'?: 'none' | 'standard' | 'large';
      'max-snippet'?: number | '-1';
    };
  };
}

export interface Theme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  fontSize: string;
  borderRadius: string;
  boxShadow: string;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

export interface Language {
  code: string; // e.g., 'en', 'pt-BR'
  name: string; // e.g., 'English', 'Português'
  nativeName?: string; // e.g., 'English', 'Português Brasileiro'
  rtl?: boolean; // Right-to-left language
}

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleRtl: () => void;
}

export interface LanguageProviderProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginationContextType {
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToPage: (page: number) => void;
}

export interface PaginationProviderProps {
  children: React.ReactNode;
  initialPagination?: Pagination;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // Custom fallback UI
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

export interface ErrorBoundaryContextType {
  hasError: boolean;
  error?: Error | null;
  resetError: () => void;
}