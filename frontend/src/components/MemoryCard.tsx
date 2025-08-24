import { QrCode, Heart, Music, Users, TreePine, Cross, Moon, Camera, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Memorial } from "@/lib/api";

interface MemoryCardProps {
  memorial: Memorial;
}

const MemoryCard = ({ memorial }: MemoryCardProps) => {
  const {
    name,
    dates,
    image_url,
    religion,
    categories,
    description,
    qr_code,
    religion_icon,
    religion_color_class
  } = memorial;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Life Moments":
        return Camera;
      case "Voice & Stories":
        return Music;
      case "Family Tree":
        return Users;
      case "Spiritual Room":
        return BookOpen;
      default:
        return Heart;
    }
  };

  const getReligionColor = (religion: string) => {
    if (religion_color_class) {
      return religion_color_class;
    }
    return religion === "Christian" 
      ? "bg-divine-gold/20 text-eternal-bronze border-divine-gold/30"
      : "bg-heavenly-blue/20 text-primary border-heavenly-blue/30";
  };

  const getReligionIcon = (religion: string) => {
    if (religion_icon) {
      return religion_icon;
    }
    return religion === "Christian" ? Cross : Moon;
  };

  const displayImage = image_url || '/placeholder-memorial.jpg';

  return (
    <Card className="group overflow-hidden bg-peaceful-white/90 backdrop-blur-sm border-2 border-blessed-beige/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-2xl">
      {/* Image Header - Enhanced to match mockup style */}
      <div className="relative h-56 bg-gradient-to-br from-blessed-beige/30 to-divine-gold/10">
        <img 
          src={displayImage} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-memorial.jpg';
          }}
        />
        
        {/* Enhanced QR Code Badge - Positioned like in mockups */}
        {qr_code && (
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-full bg-divine-gold/30 backdrop-blur-md flex items-center justify-center border-2 border-divine-gold/50 shadow-lg">
              <QrCode className="w-5 h-5 text-eternal-bronze" />
            </div>
          </div>
        )}
        
        {/* Religion Badge - Enhanced styling */}
        <div className="absolute top-4 left-4">
          <Badge className={`${getReligionColor(religion)} px-3 py-1.5 text-sm font-medium shadow-lg`}>
            {getReligionIcon(religion) === Cross ? (
              <Cross className="w-4 h-4 mr-2" />
            ) : (
              <Moon className="w-4 h-4 mr-2" />
            )}
            {religion}
          </Badge>
        </div>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content - Enhanced layout matching mockups */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-serif text-primary mb-2 leading-tight">{name}</h3>
          <p className="text-sm text-eternal-bronze font-medium bg-divine-gold/10 px-3 py-1 rounded-full inline-block">
            {dates}
          </p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* Enhanced Categories - Grid layout like in mockups */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {categories.slice(0, 4).map((category, index) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <div key={index} className="flex items-center gap-2 p-2 bg-blessed-beige/30 rounded-lg border border-blessed-beige/50">
                <IconComponent className="w-4 h-4 text-divine-gold flex-shrink-0" />
                <span className="text-xs font-medium text-primary truncate">{category}</span>
              </div>
            );
          })}
        </div>

        {/* Enhanced Action Button - Matching mockup style */}
        <Button 
          className="w-full bg-gradient-to-r from-divine-gold to-eternal-bronze hover:from-eternal-bronze hover:to-divine-gold text-primary border-0 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          variant="default"
        >
          <Heart className="w-4 h-4 mr-2" />
          View Memorial
        </Button>
      </div>
    </Card>
  );
};

export default MemoryCard;