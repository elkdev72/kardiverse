import { useState } from "react";
import { Heart, Music, BookOpen, Camera, Cross, Moon, Search, Filter, Star, Users, BookOpenCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import MemoryCard from "@/components/MemoryCard";
import { useMemorials, useMemorialsByReligion, useMemorialsByCategory, useSearchMemorials } from "@/hooks/use-api";
import { type Memorial } from "@/lib/api";
import { sampleMemorials } from "@/lib/sample-data";

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReligion, setSelectedReligion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'christian' | 'muslim'>('all');

  // API queries
  const { data: allMemorials, isLoading: isLoadingAll, error: errorAll } = useMemorials();
  const { data: christianMemorials, isLoading: isLoadingChristian } = useMemorialsByReligion('Christian');
  const { data: muslimMemorials, isLoading: isLoadingMuslim } = useMemorialsByReligion('Muslim');
  const { data: searchResults, isLoading: isLoadingSearch } = useSearchMemorials(searchQuery);

  // Enhanced category definitions matching mockups
  const categories = [
    { 
      name: "Life Moments", 
      icon: Camera, 
      color: "bg-divine-gold/20 text-eternal-bronze border-divine-gold/30",
      description: "Photos, videos, and memories of life's precious moments"
    },
    { 
      name: "Voice & Stories", 
      icon: Music, 
      color: "bg-heavenly-blue/20 text-primary border-heavenly-blue/30",
      description: "Audio recordings and personal narratives"
    },
    { 
      name: "Family Tree", 
      icon: Users, 
      color: "bg-divine-gold/20 text-eternal-bronze border-divine-gold/30",
      description: "Family connections and ancestral heritage"
    },
    { 
      name: "Spiritual Room", 
      icon: BookOpenCheck, 
      color: "bg-heavenly-blue/20 text-primary border-heavenly-blue/30",
      description: "Meditation, prayer, and spiritual reflection spaces"
    }
  ];

  // Determine which data to display
  const getDisplayData = (): { data: Memorial[] | undefined; isLoading: boolean; error: any } => {
    if (searchQuery && searchQuery.length > 2) {
      return { data: searchResults?.results, isLoading: isLoadingSearch, error: null };
    }
    
    if (viewMode === 'christian') {
      return { data: christianMemorials, isLoading: isLoadingChristian, error: null };
    }
    
    if (viewMode === 'muslim') {
      return { data: muslimMemorials, isLoading: isLoadingMuslim, error: null };
    }
    
    return { data: allMemorials?.results, isLoading: isLoadingAll, error: errorAll };
  };

  const { data: displayData, isLoading, error } = getDisplayData();

  const handleReligionFilter = (religion: string) => {
    if (viewMode === religion.toLowerCase()) {
      setViewMode('all');
    } else {
      setViewMode(religion.toLowerCase() as 'christian' | 'muslim');
    }
    setSearchQuery("");
    setSelectedCategory(null);
  };

  const handleCategoryFilter = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    setSearchQuery("");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedReligion(null);
    setSelectedCategory(null);
    setViewMode('all');
  };

  const isLoadingAny = isLoading || isLoadingAll || isLoadingChristian || isLoadingMuslim || isLoadingSearch;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sacred-cream via-peaceful-white to-blessed-beige">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-6 text-red-600">Error Loading Memorials</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Unable to load memorial data. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-cream via-peaceful-white to-blessed-beige">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-primary tracking-wide">
            MEMORY
            <span className="block text-divine-gold font-normal">GALLERY</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore sacred digital memorials that celebrate lives, preserve stories, and honor the journey from earth to eternity.
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search memorials by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 bg-peaceful-white/90 border-2 border-blessed-beige/40 rounded-xl text-lg"
            />
          </div>
          
          {/* Religion Filter Buttons - Enhanced styling */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button
              variant={viewMode === 'all' ? 'default' : 'outline'}
              size="lg"
              onClick={() => setViewMode('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                viewMode === 'all'
                  ? 'bg-gradient-to-r from-divine-gold to-eternal-bronze text-primary shadow-lg'
                  : 'bg-peaceful-white/80 text-muted-foreground border-2 border-blessed-beige/40 hover:border-divine-gold/30'
              }`}
            >
              <Star className="w-5 h-5 mr-2" />
              All Memories
            </Button>
            <Button
              variant={viewMode === 'christian' ? 'default' : 'outline'}
              size="lg"
              onClick={() => handleReligionFilter('Christian')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                viewMode === 'christian'
                  ? 'bg-gradient-to-r from-divine-gold to-eternal-bronze text-primary shadow-lg'
                  : 'bg-peaceful-white/80 text-muted-foreground border-2 border-blessed-beige/40 hover:border-divine-gold/30'
              }`}
            >
              <Cross className="w-5 h-5 mr-2" />
              Christian
            </Button>
            <Button
              variant={viewMode === 'muslim' ? 'default' : 'outline'}
              size="lg"
              onClick={() => handleReligionFilter('Muslim')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                viewMode === 'muslim'
                  ? 'bg-gradient-to-r from-divine-gold to-eternal-bronze text-primary shadow-lg'
                  : 'bg-peaceful-white/80 text-muted-foreground border-2 border-blessed-beige/40 hover:border-divine-gold/30'
              }`}
            >
              <Moon className="w-5 h-5 mr-2" />
              Muslim
            </Button>
          </div>

          {(searchQuery || viewMode !== 'all') && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-primary hover:bg-blessed-beige/30 px-4 py-2 rounded-lg"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Enhanced Category Filter - Grid layout matching mockups */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryFilter(category.name)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.name
                  ? 'bg-divine-gold/20 border-divine-gold/50 shadow-lg'
                  : 'bg-peaceful-white/80 border-blessed-beige/40 hover:border-divine-gold/30'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${category.color} flex items-center justify-center`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-primary text-center mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground text-center leading-tight">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {isLoadingAny && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-divine-gold border-t-transparent"></div>
            <p className="mt-6 text-lg text-muted-foreground">Loading memorials...</p>
          </div>
        )}

        {/* Memory Cards Grid - Enhanced layout */}
        {!isLoadingAny && displayData && displayData.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayData.map((memorial) => (
              <MemoryCard key={memorial.id} memorial={memorial} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoadingAny && displayData && displayData.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Heart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-primary mb-3">No Memorials Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `No memorials found matching "${searchQuery}"`
                  : 'No memorials available with the current filters'
                }
              </p>
              <Button onClick={clearFilters} variant="outline" className="px-6 py-3 rounded-xl">
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!isLoadingAny && displayData && displayData.length > 0 && (
          <div className="text-center mt-12 text-muted-foreground">
            <p className="text-lg">
              Showing {displayData.length} memorial{displayData.length !== 1 ? 's' : ''}
              {searchQuery && ` matching "${searchQuery}"`}
              {viewMode !== 'all' && ` (${viewMode} faith)`}
            </p>
          </div>
        )}

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-20">
          <Card className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-peaceful-white/90 to-sacred-cream/50 backdrop-blur-sm border-2 border-blessed-beige/40 rounded-2xl shadow-2xl">
            <h3 className="text-3xl font-serif mb-6 text-primary">Create Your Memorial</h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Honor your loved ones with a beautiful digital memorial that preserves their legacy for generations to come.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {categories.map((category) => (
                <div key={category.name} className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium text-primary">{category.name}</p>
                </div>
              ))}
            </div>
            <Button className="bg-gradient-to-r from-divine-gold to-eternal-bronze hover:from-eternal-bronze hover:to-divine-gold text-primary px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
              Start Creating
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Gallery;