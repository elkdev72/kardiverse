import { Baby, GraduationCap, Heart, Briefcase, TreePine, Star, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useLifePhases, useTimelineStories } from "@/hooks/use-api";
import { type LifePhase } from "@/lib/api";

const Timeline = () => {
  const { data: lifePhases, isLoading, error } = useLifePhases();
  const { data: timelineStories } = useTimelineStories();

  // Icon mapping for life phases
  const getPhaseIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'baby':
        return Baby;
      case 'graduationcap':
      case 'graduation':
        return GraduationCap;
      case 'heart':
        return Heart;
      case 'briefcase':
      case 'work':
        return Briefcase;
      case 'treepine':
      case 'tree':
        return TreePine;
      default:
        return Star;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sacred-cream via-peaceful-white to-blessed-beige">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-6 text-red-600">Error Loading Timeline</h1>
            <p className="text-lg text-muted-foreground mb-4">
              Unable to load timeline data. Please try again later.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-divine-gold/20 text-eternal-bronze border border-divine-gold/30 rounded-lg hover:bg-divine-gold/30 transition-colors"
            >
              Retry
            </button>
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
            SPIRITUAL
            <span className="block text-divine-gold font-normal">TIMELINE</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Journey through the sacred phases of life, from blessed beginnings to eternal legacy, 
            celebrating each moment as part of a divine plan.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <Loader2 className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-divine-gold mx-auto mb-4" />
            <p className="text-muted-foreground">Loading spiritual timeline...</p>
          </div>
        )}

        {/* Interactive Timeline */}
        {!isLoading && lifePhases && lifePhases.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-divine-gold via-heavenly-blue to-eternal-bronze rounded-full opacity-30"></div>
              
              {lifePhases
                .sort((a, b) => a.order - b.order)
                .map((phase, index) => {
                  const IconComponent = getPhaseIcon(phase.icon_name);
                  return (
                    <div key={phase.id} className={`relative mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}>
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-divine-gold border-4 border-peaceful-white shadow-lg z-10"></div>
                      
                      <Card className={`p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}>
                        <div className="flex items-start gap-6">
                          <div className={`w-16 h-16 rounded-full ${phase.color_class || 'bg-divine-gold/20'} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={`w-8 h-8 ${phase.icon_color_class || 'text-eternal-bronze'}`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <h3 className="text-2xl font-semibold text-primary">{phase.phase}</h3>
                              <Badge variant="outline" className="text-xs">
                                {phase.age_range}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground leading-relaxed mb-6">
                              {phase.description}
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-primary mb-3">Life Milestones</h4>
                                <ul className="space-y-2">
                                  {phase.milestones && phase.milestones.length > 0 ? (
                                    phase.milestones.map((milestone, idx) => (
                                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Star className="w-3 h-3 text-divine-gold flex-shrink-0" />
                                        {milestone}
                                      </li>
                                    ))
                                  ) : (
                                    <li className="text-sm text-muted-foreground italic">
                                      Milestones to be added
                                    </li>
                                  )}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-primary mb-3">Spiritual Dimension</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {phase.spiritual_aspect || 'Spiritual aspects to be explored'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* No Data State */}
        {!isLoading && (!lifePhases || lifePhases.length === 0) && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <TreePine className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">No Timeline Data</h3>
              <p className="text-muted-foreground">
                Life phases timeline is not available at the moment.
              </p>
            </div>
          </div>
        )}

        {/* Interactive Elements */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Your Spiritual Journey</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every life is a unique story blessed with divine purpose. Use this timeline to reflect 
              on your own journey or honor the complete life story of your loved ones.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-4 py-2 bg-divine-gold/20 text-eternal-bronze border-divine-gold/30">
                <Baby className="w-4 h-4 mr-2" />
                Childhood Memories
              </Badge>
              <Badge className="px-4 py-2 bg-heavenly-blue/20 text-primary border-heavenly-blue/30">
                <GraduationCap className="w-4 h-4 mr-2" />
                Educational Journey  
              </Badge>
              <Badge className="px-4 py-2 bg-divine-gold/20 text-eternal-bronze border-divine-gold/30">
                <Heart className="w-4 h-4 mr-2" />
                Love & Family
              </Badge>
              <Badge className="px-4 py-2 bg-heavenly-blue/20 text-primary border-heavenly-blue/30">
                <Briefcase className="w-4 h-4 mr-2" />
                Career & Service
              </Badge>
              <Badge className="px-4 py-2 bg-divine-gold/20 text-eternal-bronze border-divine-gold/30">
                <TreePine className="w-4 h-4 mr-2" />
                Wisdom & Legacy
              </Badge>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Timeline;