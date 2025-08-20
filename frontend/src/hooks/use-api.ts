import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type Memorial, type LifePhase, type TimelineStory, type LicenseFeature, type LegacyLicense, type WakeRoomExperience, type WakeRoomFeature } from '@/lib/api';

// Memorials Hooks
export const useMemorials = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['memorials', params],
    queryFn: () => apiClient.getMemorials(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMemorial = (id: number) => {
  return useQuery({
    queryKey: ['memorial', id],
    queryFn: () => apiClient.getMemorial(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFeaturedMemorials = () => {
  return useQuery({
    queryKey: ['memorials', 'featured'],
    queryFn: () => apiClient.getFeaturedMemorials(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMemorialsByReligion = (religion: string) => {
  return useQuery({
    queryKey: ['memorials', 'by_religion', religion],
    queryFn: () => apiClient.getMemorialsByReligion(religion),
    enabled: !!religion,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMemorialsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['memorials', 'by_category', category],
    queryFn: () => apiClient.getMemorialsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchMemorials = (query: string) => {
  return useQuery({
    queryKey: ['memorials', 'search', query],
    queryFn: () => apiClient.searchMemorials(query),
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Timeline Hooks
export const useLifePhases = () => {
  return useQuery({
    queryKey: ['life-phases'],
    queryFn: () => apiClient.getLifePhases(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTimelineStories = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['timeline-stories', params],
    queryFn: () => apiClient.getTimelineStories(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useStoriesByPhase = (phaseId: number) => {
  return useQuery({
    queryKey: ['timeline-stories', 'by_phase', phaseId],
    queryFn: () => apiClient.getStoriesByPhase(phaseId),
    enabled: !!phaseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useStoriesByMemorial = (memorialId: number) => {
  return useQuery({
    queryKey: ['timeline-stories', 'by_memorial', memorialId],
    queryFn: () => apiClient.getStoriesByMemorial(memorialId),
    enabled: !!memorialId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Legacy Hooks
export const useLicenseFeatures = () => {
  return useQuery({
    queryKey: ['license-features'],
    queryFn: () => apiClient.getLicenseFeatures(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLegacyLicenses = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['legacy-licenses', params],
    queryFn: () => apiClient.getLegacyLicenses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAvailableLicenses = () => {
  return useQuery({
    queryKey: ['legacy-licenses', 'available'],
    queryFn: () => apiClient.getAvailableLicenses(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFomoLicenses = () => {
  return useQuery({
    queryKey: ['legacy-licenses', 'fomo_250'],
    queryFn: () => apiClient.getFomoLicenses(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// WakeRoom Hooks
export const useWakeRoomExperiences = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['wakeroom-experiences', params],
    queryFn: () => apiClient.getWakeRoomExperiences(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedExperiences = () => {
  return useQuery({
    queryKey: ['wakeroom-experiences', 'featured'],
    queryFn: () => apiClient.getFeaturedExperiences(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useWakeRoomFeatures = () => {
  return useQuery({
    queryKey: ['wakeroom-features'],
    queryFn: () => apiClient.getWakeRoomFeatures(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useExperiencesByType = (type: string) => {
  return useQuery({
    queryKey: ['wakeroom-experiences', 'by_type', type],
    queryFn: () => apiClient.getExperiencesByType(type),
    enabled: !!type,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Statistics Hooks
export const useMemorialStats = () => {
  return useQuery({
    queryKey: ['memorial-stats'],
    queryFn: () => apiClient.getMemorialStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTimelineStats = () => {
  return useQuery({
    queryKey: ['timeline-stats'],
    queryFn: () => apiClient.getTimelineStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLegacyStats = () => {
  return useQuery({
    queryKey: ['legacy-stats'],
    queryFn: () => apiClient.getLegacyStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useWakeRoomStats = () => {
  return useQuery({
    queryKey: ['wakeroom-stats'],
    queryFn: () => apiClient.getWakeRoomStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Utility hook for invalidating queries
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();
  
  return {
    invalidateMemorials: () => queryClient.invalidateQueries({ queryKey: ['memorials'] }),
    invalidateTimeline: () => queryClient.invalidateQueries({ queryKey: ['timeline-stories'] }),
    invalidateLegacy: () => queryClient.invalidateQueries({ queryKey: ['legacy-licenses'] }),
    invalidateWakeRoom: () => queryClient.invalidateQueries({ queryKey: ['wakeroom-experiences'] }),
    invalidateAll: () => queryClient.invalidateQueries(),
  };
}; 