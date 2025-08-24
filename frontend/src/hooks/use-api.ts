import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type Memorial, type LifePhase, type TimelineStory, type LicenseFeature, type LegacyLicense, type WakeRoomExperience, type WakeRoomFeature } from '@/lib/api';
import { 
  sampleMemorials, 
  sampleLifePhases, 
  sampleLicenseFeatures, 
  sampleFomoLicenses, 
  sampleWakeRoomExperiences, 
  sampleWakeRoomFeatures 
} from '@/lib/sample-data';

// Helper function to create paginated response from sample data
const createPaginatedResponse = <T>(data: T[]): { count: number; next: null; previous: null; results: T[] } => ({
  count: data.length,
  next: null,
  previous: null,
  results: data
});

// Memorials Hooks
export const useMemorials = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['memorials', params],
    queryFn: async () => {
      try {
        return await apiClient.getMemorials(params);
      } catch (error) {
        // Fallback to sample data
        console.log('Using sample data for memorials');
        return createPaginatedResponse(sampleMemorials);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMemorial = (id: number) => {
  return useQuery({
    queryKey: ['memorial', id],
    queryFn: async () => {
      try {
        return await apiClient.getMemorial(id);
      } catch (error) {
        // Fallback to sample data
        const memorial = sampleMemorials.find(m => m.id === id);
        if (!memorial) throw new Error('Memorial not found');
        return memorial;
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useFeaturedMemorials = () => {
  return useQuery({
    queryKey: ['memorials', 'featured'],
    queryFn: async () => {
      try {
        return await apiClient.getFeaturedMemorials();
      } catch (error) {
        // Fallback to sample data
        return sampleMemorials.slice(0, 3);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMemorialsByReligion = (religion: string) => {
  return useQuery({
    queryKey: ['memorials', 'by_religion', religion],
    queryFn: async () => {
      try {
        return await apiClient.getMemorialsByReligion(religion);
      } catch (error) {
        // Fallback to sample data
        return sampleMemorials.filter(m => m.religion === religion);
      }
    },
    enabled: !!religion,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMemorialsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['memorials', 'by_category', category],
    queryFn: async () => {
      try {
        return await apiClient.getMemorialsByCategory(category);
      } catch (error) {
        // Fallback to sample data
        return sampleMemorials.filter(m => m.categories.includes(category));
      }
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchMemorials = (query: string) => {
  return useQuery({
    queryKey: ['memorials', 'search', query],
    queryFn: async () => {
      try {
        return await apiClient.searchMemorials(query);
      } catch (error) {
        // Fallback to sample data
        const filtered = sampleMemorials.filter(m => 
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.description.toLowerCase().includes(query.toLowerCase())
        );
        return createPaginatedResponse(filtered);
      }
    },
    enabled: !!query && query.length > 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Timeline Hooks
export const useLifePhases = () => {
  return useQuery({
    queryKey: ['life-phases'],
    queryFn: async () => {
      try {
        return await apiClient.getLifePhases();
      } catch (error) {
        // Fallback to sample data
        console.log('Using sample data for life phases');
        return sampleLifePhases;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTimelineStories = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['timeline-stories', params],
    queryFn: async () => {
      try {
        return await apiClient.getTimelineStories(params);
      } catch (error) {
        // Fallback to sample data
        return createPaginatedResponse([]);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useStoriesByPhase = (phaseId: number) => {
  return useQuery({
    queryKey: ['timeline-stories', 'by_phase', phaseId],
    queryFn: async () => {
      try {
        return await apiClient.getStoriesByPhase(phaseId);
      } catch (error) {
        // Fallback to sample data
        return [];
      }
    },
    enabled: !!phaseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useStoriesByMemorial = (memorialId: number) => {
  return useQuery({
    queryKey: ['timeline-stories', 'by_memorial', memorialId],
    queryFn: async () => {
      try {
        return await apiClient.getStoriesByMemorial(memorialId);
      } catch (error) {
        // Fallback to sample data
        return [];
      }
    },
    enabled: !!memorialId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Legacy Hooks
export const useLicenseFeatures = () => {
  return useQuery({
    queryKey: ['license-features'],
    queryFn: async () => {
      try {
        return await apiClient.getLicenseFeatures();
      } catch (error) {
        // Fallback to sample data
        console.log('Using sample data for license features');
        return sampleLicenseFeatures;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLegacyLicenses = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['legacy-licenses', params],
    queryFn: async () => {
      try {
        return await apiClient.getLegacyLicenses(params);
      } catch (error) {
        // Fallback to sample data
        return createPaginatedResponse(sampleFomoLicenses);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAvailableLicenses = () => {
  return useQuery({
    queryKey: ['legacy-licenses', 'available'],
    queryFn: async () => {
      try {
        return await apiClient.getAvailableLicenses();
      } catch (error) {
        // Fallback to sample data
        return sampleFomoLicenses.filter(l => l.is_available);
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useFomoLicenses = () => {
  return useQuery({
    queryKey: ['legacy-licenses', 'fomo_250'],
    queryFn: async () => {
      try {
        return await apiClient.getFomoLicenses();
      } catch (error) {
        // Fallback to sample data
        console.log('Using sample data for FOMO licenses');
        return sampleFomoLicenses;
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// WakeRoom Hooks
export const useWakeRoomExperiences = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['wakeroom-experiences', params],
    queryFn: async () => {
      try {
        return await apiClient.getWakeRoomExperiences(params);
      } catch (error) {
        // Fallback to sample data
        return createPaginatedResponse(sampleWakeRoomExperiences);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useFeaturedExperiences = () => {
  return useQuery({
    queryKey: ['wakeroom-experiences', 'featured'],
    queryFn: async () => {
      try {
        return await apiClient.getFeaturedExperiences();
      } catch (error) {
        // Fallback to sample data
        console.log('Using sample data for featured experiences');
        return sampleWakeRoomExperiences.filter(e => e.is_featured);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useWakeRoomFeatures = () => {
  return useQuery({
    queryKey: ['wakeroom-features'],
    queryFn: async () => {
      try {
        return await apiClient.getWakeRoomFeatures();
      } catch (error) {
        // Fallback to sample data
        console.log('Using sample data for WakeRoom features');
        return sampleWakeRoomFeatures;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useExperiencesByType = (type: string) => {
  return useQuery({
    queryKey: ['wakeroom-experiences', 'by_type', type],
    queryFn: async () => {
      try {
        return await apiClient.getExperiencesByType(type);
      } catch (error) {
        // Fallback to sample data
        return sampleWakeRoomExperiences.filter(e => e.experience_type === type);
      }
    },
    enabled: !!type,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Statistics Hooks
export const useMemorialStats = () => {
  return useQuery({
    queryKey: ['memorial-stats'],
    queryFn: async () => {
      try {
        return await apiClient.getMemorialStats();
      } catch (error) {
        // Fallback to sample data
        return {
          total: sampleMemorials.length,
          christian: sampleMemorials.filter(m => m.religion === 'Christian').length,
          muslim: sampleMemorials.filter(m => m.religion === 'Muslim').length
        };
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTimelineStats = () => {
  return useQuery({
    queryKey: ['timeline-stats'],
    queryFn: async () => {
      try {
        return await apiClient.getTimelineStats();
      } catch (error) {
        // Fallback to sample data
        return {
          total_phases: sampleLifePhases.length,
          active_phases: sampleLifePhases.filter(p => p.is_active).length
        };
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useLegacyStats = () => {
  return useQuery({
    queryKey: ['legacy-stats'],
    queryFn: async () => {
      try {
        return await apiClient.getLegacyStats();
      } catch (error) {
        // Fallback to sample data
        return {
          total_licenses: 250,
          sold_licenses: sampleFomoLicenses.filter(l => l.status === 'sold').length,
          available_licenses: sampleFomoLicenses.filter(l => l.is_available).length
        };
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useWakeRoomStats = () => {
  return useQuery({
    queryKey: ['wakeroom-experiences', 'statistics'],
    queryFn: async () => {
      try {
        return await apiClient.getWakeRoomStats();
      } catch (error) {
        // Fallback to sample data
        return {
          total_experiences: sampleWakeRoomExperiences.length,
          featured_experiences: sampleWakeRoomExperiences.filter(e => e.is_featured).length,
          total_features: sampleWakeRoomFeatures.length
        };
      }
    },
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