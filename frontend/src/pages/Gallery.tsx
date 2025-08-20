import { useState } from "react";
import { Heart, Music, BookOpen, Camera, Cross, Moon, Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import MemoryCard from "@/components/MemoryCard";
import { useMemorials, useMemorialsByReligion, useMemorialsByCategory, useSearchMemorials } from "@/hooks/use-api";
import { type Memorial } from "@/lib/api";

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

        {/* Search and Filters */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search memorials by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-peaceful-white/80 border-blessed-beige/30"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Button
              variant={viewMode === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('all')}
              className="bg-divine-gold/20 text-eternal-bronze border-divine-gold/30 hover:bg-divine-gold/30"
            >
              All Memories
            </Button>
            <Button
              variant={viewMode === 'christian' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleReligionFilter('Christian')}
              className="bg-divine-gold/20 text-eternal-bronze border-divine-gold/30 hover:bg-divine-gold/30"
            >
              <Cross className="w-4 h-4 mr-2" />
              Christian
            </Button>
            <Button
              variant={viewMode === 'muslim' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleReligionFilter('Muslim')}
              className="bg-heavenly-blue/20 text-primary border-heavenly-blue/30 hover:bg-heavenly-blue/30"
            >
              <Moon className="w-4 h-4 mr-2" />
              Muslim
            </Button>
          </div>

          {(searchQuery || viewMode !== 'all') && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-primary"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Category Filter Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Life Moments', 'Voice & Stories', 'Family Tree', 'Spiritual Room'].map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`px-4 py-2 cursor-pointer transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-divine-gold text-white'
                  : 'bg-peaceful-white/80 text-muted-foreground border-blessed-beige/30 hover:bg-divine-gold/10'
              }`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category === "Life Moments" && <Heart className="w-4 h-4 mr-2" />}
              {category === "Voice & Stories" && <Music className="w-4 h-4 mr-2" />}
              {category === "Family Tree" && <BookOpen className="w-4 h-4 mr-2" />}
              {category === "Spiritual Room" && <Camera className="w-4 h-4 mr-2" />}
              {category}
            </Badge>
          ))}
        </div>

        {/* Loading State */}
        {isLoadingAny && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-divine-gold"></div>
            <p className="mt-4 text-muted-foreground">Loading memorials...</p>
          </div>
        )}

        {/* Memory Cards Grid */}
        {!isLoadingAny && displayData && displayData.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayData.map((memorial) => (
              <MemoryCard key={memorial.id} memorial={memorial} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoadingAny && displayData && displayData.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">No Memorials Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery 
                  ? `No memorials found matching "${searchQuery}"`
                  : 'No memorials available with the current filters'
                }
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!isLoadingAny && displayData && displayData.length > 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            Showing {displayData.length} memorial{displayData.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
            {viewMode !== 'all' && ` (${viewMode} faith)`}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Create Your Memorial</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Honor your loved ones with a beautiful digital memorial that preserves their legacy for generations to come.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                <Heart className="w-4 h-4 mr-1" />
                Life Moments
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Music className="w-4 h-4 mr-1" />
                Voice & Stories
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <BookOpen className="w-4 h-4 mr-1" />
                Family Tree
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <Camera className="w-4 h-4 mr-1" />
                Spiritual Room
              </Badge>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Gallery;