import { useState } from "react";
import { Play, Smartphone, QrCode, Headphones, Eye, Heart, Loader2, Video, Globe, Zap, Camera, Users, BookOpen, Star } from "lucide-react";
import { sampleWakeRoomExperiences, sampleWakeRoomFeatures } from "@/lib/sample-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const WakeRoom = () => {
  // Sample data for WakeRoom experiences
  const featuredExperiences = [
    {
      id: 1,
      title: "Virtual Memorial Service",
      description: "Experience a sacred digital memorial service with 3D visualization and spatial audio.",
      experience_type: "Memorial Service",
      thumbnail_url: "/placeholder-memorial.jpg",
      duration_minutes: 15,
      qr_code_required: true,
      is_featured: true
    },
    {
      id: 2,
      title: "Family Story Time",
      description: "Interactive storytelling experience with family photos and voice recordings.",
      experience_type: "Storytelling",
      thumbnail_url: "/placeholder-memorial.jpg",
      duration_minutes: 10,
      qr_code_required: false,
      is_featured: true
    },
    {
      id: 3,
      title: "Spiritual Reflection Room",
      description: "Peaceful meditation space with ambient sounds and guided spiritual practices.",
      experience_type: "Meditation",
      thumbnail_url: "/placeholder-memorial.jpg",
      duration_minutes: 20,
      qr_code_required: false,
      is_featured: true
    }
  ];

  const features = [
    {
      id: 1,
      name: "Augmented Reality",
      description: "Overlay digital memories onto the physical world through your smartphone camera.",
      icon_name: "eye",
      feature_type: "AR Technology",
      is_active: true
    },
    {
      id: 2,
      name: "Spatial Audio",
      description: "3D audio experience that makes memories feel alive and present.",
      icon_name: "headphones",
      feature_type: "Audio Technology",
      is_active: true
    },
    {
      id: 3,
      name: "QR Code Integration",
      description: "Quick access to WakeRoom experiences by scanning memorial cards.",
      icon_name: "qrcode",
      feature_type: "Access Control",
      is_active: true
    },
    {
      id: 4,
      name: "Mobile AR",
      description: "Full AR experience optimized for mobile devices and tablets.",
      icon_name: "smartphone",
      feature_type: "Mobile Technology",
      is_active: true
    },
    {
      id: 5,
      name: "3D Visualization",
      description: "Interactive 3D models and environments for immersive storytelling.",
      icon_name: "video",
      feature_type: "Visual Technology",
      is_active: true
    },
    {
      id: 6,
      name: "Global Access",
      description: "Access WakeRoom experiences from anywhere in the world.",
      icon_name: "globe",
      feature_type: "Connectivity",
      is_active: true
    }
  ];

  // Demo scene state
  const [activeScene, setActiveScene] = useState('overview');
  const [isARMode, setIsARMode] = useState(false);

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
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-light text-center mb-12 text-primary">Featured Experiences</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExperiences.map((experience) => (
              <Card key={experience.id} className="overflow-hidden bg-peaceful-white/90 backdrop-blur-sm border-2 border-blessed-beige/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-2xl">
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
                    <Badge className="bg-divine-gold/20 text-eternal-bronze border-divine-gold/30 px-3 py-1">
                      {experience.experience_type}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{experience.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {experience.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs bg-blessed-beige/30 border-blessed-beige/50">
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

        {/* Main Demo Video */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-peaceful-white to-sacred-cream rounded-2xl">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blessed-beige/30 to-divine-gold/10 relative">
              <Button
                className="w-32 h-32 rounded-full bg-divine-gold/20 hover:bg-divine-gold/30 border-2 border-divine-gold/40 backdrop-blur-sm transition-all duration-500 hover:scale-110"
                variant="ghost"
              >
                <Play className="w-12 h-12 text-eternal-bronze ml-2" />
              </Button>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-divine-gold/20 text-eternal-bronze border-divine-gold/30 px-3 py-1">
                  AR/VR Demo
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-heavenly-blue/20 text-primary border-heavenly-blue/30 px-3 py-1">
                  Interactive Experience
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => {
            const IconComponent = getFeatureIcon(feature.icon_name);
            return (
              <Card key={feature.id} className="p-8 text-center bg-peaceful-white/90 backdrop-blur-sm border-2 border-blessed-beige/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center border-2 border-divine-gold/30">
                  <IconComponent className="w-8 h-8 text-eternal-bronze" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">{feature.name}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>
                {feature.feature_type && (
                  <Badge variant="outline" className="mt-4 text-xs bg-blessed-beige/30 border-blessed-beige/50">
                    {feature.feature_type}
                  </Badge>
                )}
              </Card>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-light text-center mb-12 text-primary">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center text-2xl font-bold text-eternal-bronze border-2 border-divine-gold/30">
                1
              </div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Scan QR Code</h3>
              <p className="text-muted-foreground">
                Use your smartphone to scan the QR code on the memorial card.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-heavenly-blue/20 flex items-center justify-center text-2xl font-bold text-primary border-2 border-heavenly-blue/30">
                2
              </div>
              <h3 className="text-lg font-semibold mb-4 text-primary">Enter WakeRoom</h3>
              <p className="text-muted-foreground">
                Launch the immersive AR experience directly from your mobile device.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center text-2xl font-bold text-eternal-bronze border-2 border-divine-gold/30">
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
        <Card className="max-w-4xl mx-auto p-8 bg-peaceful-white/90 backdrop-blur-sm border-2 border-blessed-beige/40 rounded-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Advanced Technology</h3>
            <p className="text-muted-foreground leading-relaxed">
              Powered by cutting-edge AR technology and AI-driven storytelling to create meaningful digital experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-divine-gold/20 flex items-center justify-center border border-divine-gold/30">
                <Smartphone className="w-6 h-6 text-eternal-bronze" />
              </div>
              <p className="text-sm font-medium text-primary">Mobile AR</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-heavenly-blue/20 flex items-center justify-center border border-heavenly-blue/30">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-primary">3D Visualization</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-divine-gold/20 flex items-center justify-center border border-divine-gold/30">
                <Headphones className="w-6 h-6 text-eternal-bronze" />
              </div>
              <p className="text-sm font-medium text-primary">Spatial Audio</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-heavenly-blue/20 flex items-center justify-center border border-heavenly-blue/30">
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