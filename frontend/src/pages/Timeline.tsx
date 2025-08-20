import { Baby, GraduationCap, Heart, Briefcase, TreePine, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Timeline = () => {
  const lifePhases = [
    {
      id: 1,
      phase: "Birth & Childhood",
      age: "0-12 years",
      icon: Baby,
      color: "bg-divine-gold/20",
      iconColor: "text-eternal-bronze",
      description: "The foundation years filled with wonder, learning, and family bonds.",
      milestones: [
        "First steps and words",
        "School days and friendships", 
        "Family traditions and holidays",
        "Childhood dreams and innocence"
      ],
      spiritualAspect: "Formation of faith and values through family guidance"
    },
    {
      id: 2,
      phase: "Youth & Learning",
      age: "13-25 years",
      icon: GraduationCap,
      color: "bg-heavenly-blue/20",
      iconColor: "text-primary",
      description: "A time of growth, education, and discovering one's purpose in life.",
      milestones: [
        "Education and academic achievements",
        "Coming of age ceremonies",
        "First loves and heartbreaks",
        "Career aspirations emerge"
      ],
      spiritualAspect: "Deepening understanding of faith and personal spiritual journey"
    },
    {
      id: 3,
      phase: "Love & Partnership",
      age: "26-40 years",
      icon: Heart,
      color: "bg-divine-gold/20",
      iconColor: "text-eternal-bronze",
      description: "Building relationships, starting families, and creating lasting bonds.",
      milestones: [
        "Finding life partner",
        "Wedding celebrations",
        "Birth of children",
        "Building a home together"
      ],
      spiritualAspect: "Shared faith journey and raising children in spiritual values"
    },
    {
      id: 4,
      phase: "Service & Achievement",
      age: "41-65 years",
      icon: Briefcase,
      color: "bg-heavenly-blue/20",
      iconColor: "text-primary",
      description: "Peak years of career, community service, and mentoring others.",
      milestones: [
        "Career accomplishments",
        "Community leadership",
        "Mentoring younger generations",
        "Financial stability and security"
      ],
      spiritualAspect: "Using talents and blessings to serve community and faith"
    },
    {
      id: 5,
      phase: "Wisdom & Legacy",
      age: "66+ years",
      icon: TreePine,
      color: "bg-divine-gold/20",
      iconColor: "text-eternal-bronze",
      description: "The golden years of sharing wisdom and leaving a lasting legacy.",
      milestones: [
        "Grandchildren and great-grandchildren",
        "Retirement and new adventures",
        "Sharing life stories and wisdom",
        "Legacy planning and giving"
      ],
      spiritualAspect: "Reflection on life's journey and preparation for eternal peace"
    }
  ];

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

        {/* Interactive Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-divine-gold via-heavenly-blue to-eternal-bronze rounded-full opacity-30"></div>
            
            {lifePhases.map((phase, index) => (
              <div key={phase.id} className={`relative mb-16 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}>
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-divine-gold border-4 border-peaceful-white shadow-lg z-10"></div>
                
                <Card className={`p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${index % 2 === 0 ? 'lg:mr-12' : 'lg:ml-12'}`}>
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center flex-shrink-0`}>
                      <phase.icon className={`w-8 h-8 ${phase.iconColor}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-semibold text-primary">{phase.phase}</h3>
                        <Badge variant="outline" className="text-xs">
                          {phase.age}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {phase.description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-primary mb-3">Life Milestones</h4>
                          <ul className="space-y-2">
                            {phase.milestones.map((milestone, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Star className="w-3 h-3 text-divine-gold flex-shrink-0" />
                                {milestone}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary mb-3">Spiritual Dimension</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {phase.spiritualAspect}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

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