import { useState } from "react";
import { Play, ArrowRight, Heart, Users, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Welcome = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-cream via-peaceful-white to-blessed-beige">
      <Navigation />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-light mb-6 text-primary tracking-wide">
            MUSEUM OF
            <span className="block text-divine-gold font-normal">MEMORY</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Preserving precious moments, celebrating sacred lives, and connecting generations through digital legacy storytelling.
          </p>
        </div>

        {/* Video/Animation Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="relative overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-peaceful-white to-sacred-cream">
            <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blessed-beige/50 to-divine-gold/20">
              {!isVideoPlaying ? (
                <Button
                  onClick={() => setIsVideoPlaying(true)}
                  className="w-24 h-24 rounded-full bg-divine-gold/20 hover:bg-divine-gold/30 border-2 border-divine-gold/40 backdrop-blur-sm transition-all duration-500 hover:scale-110"
                  variant="ghost"
                >
                  <Play className="w-8 h-8 text-eternal-bronze ml-1" />
                </Button>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-divine-gold/20 flex items-center justify-center animate-pulse">
                      <Heart className="w-8 h-8 text-eternal-bronze" />
                    </div>
                    <p className="text-lg font-light">Kardiverse Introduction Video</p>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center">
              <Heart className="w-8 h-8 text-eternal-bronze" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Sacred Memories</h3>
            <p className="text-muted-foreground leading-relaxed">
              Digital memorial cards that celebrate life stories with love and reverence.
            </p>
          </Card>

          <Card className="p-8 text-center bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-heavenly-blue/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Family Connection</h3>
            <p className="text-muted-foreground leading-relaxed">
              Bring families together through shared memories and spiritual experiences.
            </p>
          </Card>

          <Card className="p-8 text-center bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center">
              <Star className="w-8 h-8 text-eternal-bronze" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Eternal Legacy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Create lasting digital monuments that honor and preserve life's precious moments.
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/gallery')}
            className="bg-divine-gold hover:bg-eternal-bronze text-primary px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore Memory Gallery
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Welcome;