import { Play, Smartphone, QrCode, Headphones, Eye, Heart, Loader2, Video, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useWakeRoomExperiences, useWakeRoomFeatures, useFeaturedExperiences } from "@/hooks/use-api";
import { type WakeRoomExperience, type WakeRoomFeature } from "@/lib/api";

const WakeRoom = () => {
  const { data: experiences, isLoading: isLoadingExperiences } = useWakeRoomExperiences();
  const { data: features, isLoading: isLoadingFeatures } = useWakeRoomFeatures();
  const { data: featuredExperiences } = useFeaturedExperiences();

  // Icon mapping for WakeRoom features
  const getFeatureIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'eye':
        return Eye;
      case 'headphones':
        return Headphones;
      case 'qrcode':
        return QrCode;
      case 'smartphone':
        return Smartphone;
      case 'video':
        return Video;
      case 'globe':
        return Globe;
      case 'zap':
        return Zap;
      case 'heart':
        return Heart;
      default:
        return Eye;
    }
  };

  if (isLoadingExperiences || isLoadingFeatures) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sacred-cream via-peaceful-white to-blessed-beige">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center py-16">
            <Loader2 className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-divine-gold mx-auto mb-4" />
            <p className="text-muted-foreground">Loading WakeRoom experiences...</p>
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
            WAKEROOM
            <span className="block text-divine-gold font-normal">EXPERIENCE</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in a sacred digital space where memories come alive through augmented reality and immersive storytelling.
          </p>
        </div>

        {/* Featured Experiences */}
        {featuredExperiences && featuredExperiences.length > 0 && (
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-light text-center mb-12 text-primary">Featured Experiences</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredExperiences.map((experience) => (
                <Card key={experience.id} className="overflow-hidden bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  {experience.thumbnail_url && (
                    <div className="aspect-video bg-gradient-to-br from-blessed-beige/30 to-divine-gold/10 relative">
                      <img 
                        src={experience.thumbnail_url} 
                        alt={experience.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Button
                          className="w-20 h-20 rounded-full bg-divine-gold/20 hover:bg-divine-gold/30 border-2 border-divine-gold/40 backdrop-blur-sm transition-all duration-500 hover:scale-110"
                          variant="ghost"
                        >
                          <Play className="w-8 h-8 text-eternal-bronze ml-1" />
                        </Button>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-divine-gold/20 text-eternal-bronze border-divine-gold/30">
                          {experience.experience_type}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-primary">{experience.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {experience.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {experience.duration_minutes} min
                      </Badge>
                      {experience.qr_code_required && (
                        <QrCode className="w-4 h-4 text-divine-gold" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Demo Video */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-peaceful-white to-sacred-cream">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blessed-beige/30 to-divine-gold/10 relative">
              <Button
                className="w-32 h-32 rounded-full bg-divine-gold/20 hover:bg-divine-gold/30 border-2 border-divine-gold/40 backdrop-blur-sm transition-all duration-500 hover:scale-110"
                variant="ghost"
              >
                <Play className="w-12 h-12 text-eternal-bronze ml-2" />
              </Button>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-divine-gold/20 text-eternal-bronze border-divine-gold/30">
                  AR/VR Demo
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-heavenly-blue/20 text-primary border-heavenly-blue/30">
                  Interactive Experience
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        {features && features.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.slice(0, 6).map((feature) => {
              const IconComponent = getFeatureIcon(feature.icon_name);
              return (
                <Card key={feature.id} className="p-8 text-center bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-eternal-bronze" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{feature.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.feature_type && (
                    <Badge variant="outline" className="mt-4 text-xs">
                      {feature.feature_type}
                    </Badge>
                  )}
                </Card>
              );
            })}
          </div>
        )}

        {/* No Features State */}
        {(!features || features.length === 0) && (
          <div className="text-center py-16 mb-16">
            <div className="max-w-md mx-auto">
              <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">No WakeRoom Features</h3>
              <p className="text-muted-foreground">
                WakeRoom features are not available at the moment.
              </p>
            </div>
          </div>
        )}

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-light text-center mb-12 text-primary">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center text-2xl font-bold text-eternal-bronze">
                1
              </div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Scan QR Code</h3>
              <p className="text-muted-foreground">
                Use your smartphone to scan the QR code on the memorial card.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-heavenly-blue/20 flex items-center justify-center text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Enter WakeRoom</h3>
              <p className="text-muted-foreground">
                Launch the immersive AR experience directly from your mobile device.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center text-2xl font-bold text-eternal-bronze">
                3
              </div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Experience Memories</h3>
              <p className="text-muted-foreground">
                Interact with 3D memories, listen to voice recordings, and explore life stories.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Showcase */}
        <Card className="max-w-4xl mx-auto p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Advanced Technology</h3>
            <p className="text-muted-foreground leading-relaxed">
              Powered by cutting-edge AR technology and AI-driven storytelling to create meaningful digital experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-divine-gold/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-eternal-bronze" />
              </div>
              <p className="text-sm font-medium text-primary">Mobile AR</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-heavenly-blue/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-primary">3D Visualization</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-divine-gold/20 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-eternal-bronze" />
              </div>
              <p className="text-sm font-medium text-primary">Spatial Audio</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-heavenly-blue/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-primary">AI Storytelling</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default WakeRoom;