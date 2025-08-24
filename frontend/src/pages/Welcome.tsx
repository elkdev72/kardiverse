import { useState } from "react";
import { Play, ArrowRight, Heart, Users, Clock, Star, Camera, Music, BookOpen, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import SpiritualLayout from "../components/SpiritualLayout";

const Welcome = () => {
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Feature categories matching the mockup design
  const featureCategories = [
    {
      icon: Camera,
      title: "LIFE MOMENTS",
      description: "Capture and preserve precious life events with photos, videos, and stories.",
      color: "bg-divine-gold/20 text-eternal-bronze",
      borderColor: "border-divine-gold/30",
      hoverColor: "hover:bg-divine-gold/30",
      path: "/gallery"
    },
    {
      icon: Music,
      title: "VOICE & STORIES",
      description: "Record audio memories, personal narratives, and family stories.",
      color: "bg-heavenly-blue/20 text-primary",
      borderColor: "border-heavenly-blue/30",
      hoverColor: "hover:bg-heavenly-blue/30",
      path: "/gallery"
    },
    {
      icon: Users,
      title: "FAMILY TREE",
      description: "Build and explore your family connections and ancestral heritage.",
      color: "bg-divine-gold/20 text-eternal-bronze",
      borderColor: "border-divine-gold/30",
      hoverColor: "hover:bg-divine-gold/30",
      path: "/timeline"
    },
    {
      icon: BookOpenCheck,
      title: "SPIRITUAL ROOM",
      description: "Create sacred spaces for meditation, prayer, and spiritual reflection.",
      color: "bg-heavenly-blue/20 text-primary",
      borderColor: "border-heavenly-blue/30",
      hoverColor: "hover:bg-heavenly-blue/30",
      path: "/wakeroom"
    }
  ];

  return (
    <SpiritualLayout>
      {/* Hero Section - Enhanced to match mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-serif mb-6 text-primary tracking-wide">
          MUSEUM OF
          <span className="block text-divine-gold font-normal">MEMORY</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Preserving precious moments, celebrating sacred lives, and connecting generations through digital legacy storytelling.
        </p>
      </motion.div>

      {/* Central Portrait Section - Matching mockup design */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl mx-auto mb-16 text-center"
      >
        <div className="relative inline-block">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl border-4 border-divine-gold/30 overflow-hidden shadow-2xl bg-gradient-to-br from-blessed-beige to-sacred-cream">
            <div className="w-full h-full bg-gradient-to-br from-divine-gold/20 to-heavenly-blue/20 flex items-center justify-center">
              <Heart className="w-20 h-20 text-eternal-bronze opacity-60" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-divine-gold/20 rounded-full flex items-center justify-center border-2 border-divine-gold/50">
            <Star className="w-4 h-4 text-eternal-bronze" />
          </div>
        </div>
      </motion.div>

      {/* Feature Categories Grid - 2x2 layout matching mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-2 gap-6 max-w-4xl mx-auto mb-16"
      >
        {featureCategories.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
          >
            <Card 
              onClick={() => navigate(feature.path)}
              className={`p-6 text-center bg-peaceful-white/90 backdrop-blur-sm border-2 ${feature.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl cursor-pointer ${feature.hoverColor}`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${feature.color} flex items-center justify-center border-2 ${feature.borderColor}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-primary">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        <Card 
          onClick={() => navigate('/gallery')}
          className="p-8 text-center bg-peaceful-white/80 backdrop-blur-sm border-2 border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 rounded-2xl cursor-pointer"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center">
            <Heart className="w-8 h-8 text-eternal-bronze" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Sacred Memories</h3>
          <p className="text-muted-foreground leading-relaxed">
            Digital memorial cards that celebrate life stories with love and reverence.
          </p>
        </Card>

        <Card 
          onClick={() => navigate('/timeline')}
          className="p-8 text-center bg-peaceful-white/80 backdrop-blur-sm border-2 border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 rounded-2xl cursor-pointer"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-heavenly-blue/20 flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Family Connection</h3>
          <p className="text-muted-foreground leading-relaxed">
            Bring families together through shared memories and spiritual experiences.
          </p>
        </Card>

        <Card 
          onClick={() => navigate('/legacy')}
          className="p-8 text-center bg-peaceful-white/80 backdrop-blur-sm border-2 border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 rounded-2xl cursor-pointer"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center">
            <Star className="w-8 h-8 text-eternal-bronze" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Eternal Legacy</h3>
          <p className="text-muted-foreground leading-relaxed">
            Create lasting digital monuments that honor and preserve life's precious moments.
          </p>
        </Card>
      </motion.div>

      {/* CTA Section - Enhanced styling */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <Button
          onClick={() => navigate('/gallery')}
          className="bg-gradient-to-r from-divine-gold to-eternal-bronze hover:from-eternal-bronze hover:to-divine-gold text-primary px-10 py-5 text-xl rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl font-medium"
        >
          Explore Memory Gallery
          <ArrowRight className="w-6 h-6 ml-3" />
        </Button>
      </motion.div>
    </SpiritualLayout>
  );
};

export default Welcome;