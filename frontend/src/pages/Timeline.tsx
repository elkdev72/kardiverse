import { Baby, GraduationCap, Heart, Briefcase, TreePine, Star, Loader2, Camera, Music, BookOpen, Video, Calendar, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { useLifePhases, useTimelineStories } from "@/hooks/use-api";
import { type LifePhase } from "@/lib/api";
import { sampleLifePhases } from "@/lib/sample-data";

const Timeline = () => {
  const { data: lifePhases, isLoading, error } = useLifePhases();
  const { data: timelineStories } = useTimelineStories();

  const mediaTypes = [
    { icon: Camera, label: "Photos", color: "bg-divine-gold/20 text-eternal-bronze" },
    { icon: Video, label: "Videos", color: "bg-heavenly-blue/20 text-primary" },
    { icon: Music, label: "Audio", color: "bg-divine-gold/20 text-eternal-bronze" },
    { icon: BookOpen, label: "Poetry", color: "bg-heavenly-blue/20 text-primary" }
  ];

  // Enhanced life phases data structure matching mockups
  const enhancedLifePhases = [
    {
      id: 1,
      phase: "Childhood & Early Years",
      age_range: "0-18 years",
      icon_name: "baby",
      color_class: "bg-divine-gold/20",
      icon_color_class: "text-eternal-bronze",
      description: "The foundation years filled with wonder, learning, and spiritual awakening.",
      milestones: ["First steps", "First words", "School beginnings", "Religious education"],
      spiritual_aspect: "Innocence and divine wonder, the pure connection to God's creation.",
      order: 1,
      media_count: 24,
      stories_count: 8
    },
    {
      id: 2,
      phase: "Education & Growth",
      age_range: "18-25 years",
      icon_name: "graduationcap",
      color_class: "bg-heavenly-blue/20",
      icon_color_class: "text-primary",
      description: "Years of learning, discovery, and deepening spiritual understanding.",
      milestones: ["Higher education", "Career preparation", "Spiritual studies", "Community involvement"],
      spiritual_aspect: "Seeking wisdom and knowledge as a path to divine understanding.",
      order: 2,
      media_count: 18,
      stories_count: 6
    },
    {
      id: 3,
      phase: "Love & Family",
      age_range: "25-40 years",
      icon_name: "heart",
      color_class: "bg-divine-gold/20",
      icon_color_class: "text-eternal-bronze",
      description: "Building relationships, starting families, and nurturing spiritual bonds.",
      milestones: ["Marriage", "Children", "Family traditions", "Spiritual leadership"],
      spiritual_aspect: "Love as a reflection of divine love, family as sacred community.",
      order: 3,
      media_count: 32,
      stories_count: 12
    },
    {
      id: 4,
      phase: "Career & Service",
      age_range: "40-60 years",
      icon_name: "briefcase",
      color_class: "bg-heavenly-blue/20",
      icon_color_class: "text-primary",
      description: "Professional achievement, community service, and spiritual mentorship.",
      milestones: ["Career success", "Community service", "Mentoring others", "Spiritual guidance"],
      spiritual_aspect: "Using talents and skills to serve others and honor God's gifts.",
      order: 4,
      media_count: 28,
      stories_count: 10
    },
    {
      id: 5,
      phase: "Wisdom & Legacy",
      age_range: "60+ years",
      icon_name: "treepine",
      color_class: "bg-divine-gold/20",
      icon_color_class: "text-eternal-bronze",
      description: "Sharing wisdom, preserving memories, and preparing spiritual legacy.",
      milestones: ["Retirement", "Grandparenting", "Storytelling", "Spiritual legacy"],
      spiritual_aspect: "Passing on wisdom and faith to future generations.",
      order: 5,
      media_count: 45,
      stories_count: 15
    }
  ];

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

        {/* Interactive Timeline - Enhanced to match mockups */}
        {!isLoading && (
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-divine-gold via-heavenly-blue to-eternal-bronze rounded-full opacity-30"></div>
              
              {enhancedLifePhases
                .sort((a, b) => a.order - b.order)
                .map((phase, index) => {
                  const IconComponent = getPhaseIcon(phase.icon_name);
                  return (
                    <motion.div 
                      key={phase.id} 
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`relative mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-divine-gold border-4 border-peaceful-white shadow-2xl z-10 flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      
                      <Card className={`p-8 bg-peaceful-white/90 backdrop-blur-sm border-2 border-blessed-beige/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-2xl ${index % 2 === 0 ? 'lg:mr-16' : 'lg:ml-16'}`}>
                        <div className="flex items-start gap-6">
                          <div className={`w-20 h-20 rounded-full ${phase.color_class} flex items-center justify-center flex-shrink-0 border-2 border-blessed-beige/50`}>
                            <IconComponent className={`w-10 h-10 ${phase.icon_color_class}`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <h3 className="text-2xl font-serif text-primary">{phase.phase}</h3>
                              <Badge variant="outline" className="text-sm px-3 py-1 bg-divine-gold/10 border-divine-gold/30">
                                {phase.age_range}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                              {phase.description}
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                  <Star className="w-5 h-5 text-divine-gold" />
                                  Life Milestones
                                </h4>
                                <ul className="space-y-2">
                                  {phase.milestones.map((milestone, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <div className="w-2 h-2 bg-divine-gold rounded-full flex-shrink-0"></div>
                                      {milestone}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                  <Award className="w-5 h-5 text-heavenly-blue" />
                                  Spiritual Dimension
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                  {phase.spiritual_aspect}
                                </p>
                                
                                {/* Media and Stories Count */}
                                <div className="flex gap-4 text-xs">
                                  <div className="flex items-center gap-1 text-divine-gold">
                                    <Camera className="w-4 h-4" />
                                    {phase.media_count} media
                                  </div>
                                  <div className="flex items-center gap-1 text-heavenly-blue">
                                    <BookOpen className="w-4 h-4" />
                                    {phase.stories_count} stories
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Media Types Showcase - Matching mockup style */}
        <div className="max-w-4xl mx-auto mt-20">
          <Card className="p-8 bg-peaceful-white/90 backdrop-blur-sm border-2 border-blessed-beige/40 text-center rounded-2xl">
            <h3 className="text-2xl font-serif mb-6 text-primary">Your Spiritual Journey</h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              Every life is a unique story blessed with divine purpose. Use this timeline to reflect 
              on your own journey or honor the complete life story of your loved ones.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mediaTypes.map((media, index) => (
                <motion.div
                  key={media.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-blessed-beige/50 hover:border-divine-gold/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${media.color} flex items-center justify-center`}>
                    <media.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-primary">{media.label}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Timeline;