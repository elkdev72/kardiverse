const API_BASE_URL = 'http://localhost:8000/api/v1';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Memorial Types
export interface Memorial {
  id: number;
  name: string;
  dates: string;
  birth_date: string | null;
  death_date: string | null;
  image: string | null;
  image_url: string | null;
  religion: 'Christian' | 'Muslim';
  categories: string[];
  description: string;
  qr_code: boolean;
  qr_code_data: string;
  family_members: string[];
  life_story: string;
  favorite_quotes: string[];
  achievements: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
  language: string;
  religion_icon: string;
  religion_color_class: string;
  categories_display: string;
}

// Life Phase Types
export interface LifePhase {
  id: number;
  phase: string;
  age_range: string;
  icon_name: string;
  color_class: string;
  icon_color_class: string;
  description: string;
  milestones: string[];
  spiritual_aspect: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Timeline Story Types
export interface TimelineStory {
  id: number;
  title: string;
  content: string;
  life_phase: number;
  memorial: number;
  image: string | null;
  audio_file: string | null;
  video_file: string | null;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

// License Types
export interface LicenseFeature {
  id: number;
  name: string;
  description: string;
  icon_name: string;
  category: string;
  is_active: boolean;
}

export interface LegacyLicense {
  id: string;
  license_id: string;
  license_number: number;
  license_type: string;
  status: string;
  original_price: string;
  current_price: string;
  is_discounted: boolean;
  discount_percentage: number;
  features: string[];
  storage_limit_gb: number;
  family_members_limit: number;
  lifetime_guarantee: boolean;
  purchaser: number | null;
  purchase_date: string | null;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
  expires_at: string | null;
  is_available: boolean;
}

// WakeRoom Types
export interface WakeRoomExperience {
  id: number;
  title: string;
  description: string;
  experience_type: string;
  status: string;
  demo_video: string | null;
  thumbnail_image: string | null;
  thumbnail_url: string | null;
  ar_model_file: string | null;
  vr_scene_file: string | null;
  qr_code_required: boolean;
  qr_code_data: string;
  nfc_enabled: boolean;
  nfc_data: string;
  duration_minutes: number;
  is_immersive: boolean;
  requires_headset: boolean;
  spatial_audio: boolean;
  associated_memorials: number[];
  created_by: number | null;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
}

export interface WakeRoomFeature {
  id: number;
  name: string;
  description: string;
  icon_name: string;
  is_active: boolean;
  feature_type: string;
  technical_requirements: string[];
}

// API Client Class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Memorials API
  async getMemorials(params?: Record<string, any>): Promise<PaginatedResponse<Memorial>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<PaginatedResponse<Memorial>>(`/memorials/${queryString}`);
  }

  async getMemorial(id: number): Promise<Memorial> {
    return this.request<Memorial>(`/memorials/${id}/`);
  }

  async getFeaturedMemorials(): Promise<Memorial[]> {
    return this.request<Memorial[]>('/memorials/featured/');
  }

  async getMemorialsByReligion(religion: string): Promise<Memorial[]> {
    return this.request<Memorial[]>(`/memorials/by_religion/?religion=${religion}`);
  }

  async getMemorialsByCategory(category: string): Promise<Memorial[]> {
    return this.request<Memorial[]>(`/memorials/by_category/?category=${category}`);
  }

  async searchMemorials(query: string): Promise<PaginatedResponse<Memorial>> {
    return this.request<PaginatedResponse<Memorial>>(`/memorials/search/?search=${query}`);
  }

  // Timeline API
  async getLifePhases(): Promise<LifePhase[]> {
    return this.request<LifePhase[]>('/timeline/phases/');
  }

  async getTimelineStories(params?: Record<string, any>): Promise<PaginatedResponse<TimelineStory>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<PaginatedResponse<TimelineStory>>(`/timeline/stories/${queryString}`);
  }

  async getStoriesByPhase(phaseId: number): Promise<TimelineStory[]> {
    return this.request<TimelineStory[]>(`/timeline/stories/by_phase/?phase_id=${phaseId}`);
  }

  async getStoriesByMemorial(memorialId: number): Promise<TimelineStory[]> {
    return this.request<TimelineStory[]>(`/timeline/stories/by_memorial/?memorial_id=${memorialId}`);
  }

  // Legacy API
  async getLicenseFeatures(): Promise<LicenseFeature[]> {
    return this.request<LicenseFeature[]>('/legacy/features/');
  }

  async getLegacyLicenses(params?: Record<string, any>): Promise<PaginatedResponse<LegacyLicense>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<PaginatedResponse<LegacyLicense>>(`/legacy/licenses/${queryString}`);
  }

  async getAvailableLicenses(): Promise<LegacyLicense[]> {
    return this.request<LegacyLicense[]>('/legacy/licenses/available/');
  }

  async getFomoLicenses(): Promise<LegacyLicense[]> {
    return this.request<LegacyLicense[]>('/legacy/licenses/featured/');
  }

  // WakeRoom API
  async getWakeRoomExperiences(params?: Record<string, any>): Promise<PaginatedResponse<WakeRoomExperience>> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<PaginatedResponse<WakeRoomExperience>>(`/wakeroom/experiences/${queryString}`);
  }

  async getFeaturedExperiences(): Promise<WakeRoomExperience[]> {
    return this.request<WakeRoomExperience[]>('/wakeroom/experiences/featured/');
  }

  async getWakeRoomFeatures(): Promise<WakeRoomFeature[]> {
    return this.request<WakeRoomFeature[]>('/wakeroom/features/');
  }

  async getExperiencesByType(type: string): Promise<WakeRoomExperience[]> {
    return this.request<WakeRoomExperience[]>(`/wakeroom/experiences/by_type/?type=${type}`);
  }

  // Statistics API
  async getMemorialStats(): Promise<any> {
    return this.request<any>('/memorials/statistics/');
  }

  async getTimelineStats(): Promise<any> {
    return this.request<any>('/timeline/phases/statistics/');
  }

  async getLegacyStats(): Promise<any> {
    return this.request<any>('/legacy/licenses/statistics/');
  }

  async getWakeRoomStats(): Promise<any> {
    return this.request<any>('/wakeroom/experiences/statistics/');
  }
}

// Export singleton instance
export const apiClient = new ApiClient(); 