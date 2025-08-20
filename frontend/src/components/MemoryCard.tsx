import { QrCode, Heart, Music, Users, TreePine, Cross, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MemoryCardProps {
  id: number;
  name: string;
  dates: string;
  image: string;
  religion: "Christian" | "Muslim";
  categories: string[];
  description: string;
  qrCode: boolean;
}

const MemoryCard = ({ name, dates, image, religion, categories, description, qrCode }: MemoryCardProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Life Moments":
        return Heart;
      case "Voice & Stories":
        return Music;
      case "Family Tree":
        return Users;
      case "Spiritual Room":
        return TreePine;
      default:
        return Heart;
    }
  };

  const getReligionColor = (religion: string) => {
    return religion === "Christian" 
      ? "bg-divine-gold/20 text-eternal-bronze border-divine-gold/30"
      : "bg-heavenly-blue/20 text-primary border-heavenly-blue/30";
  };

  return (
    <Card className="group overflow-hidden bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Header */}
      <div className="relative h-48 bg-blessed-beige/30">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* QR Code Badge */}
        {qrCode && (
          <div className="absolute top-3 right-3">
            <div className="w-8 h-8 rounded-full bg-divine-gold/20 backdrop-blur-sm flex items-center justify-center">
              <QrCode className="w-4 h-4 text-eternal-bronze" />
            </div>
          </div>
        )}
        
        {/* Religion Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={getReligionColor(religion)}>
            {religion === "Christian" ? (
              <Cross className="w-3 h-3 mr-1" />
            ) : (
              <Moon className="w-3 h-3 mr-1" />
            )}
            {religion}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary mb-1">{name}</h3>
          <p className="text-sm text-eternal-bronze font-medium">{dates}</p>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.slice(0, 3).map((category, index) => {
            const IconComponent = getCategoryIcon(category);
            return (
              <Badge key={index} variant="outline" className="text-xs">
                <IconComponent className="w-3 h-3 mr-1" />
                {category}
              </Badge>
            );
          })}
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-divine-gold/10 hover:bg-divine-gold/20 text-primary border border-divine-gold/30 transition-all duration-300"
          variant="outline"
        >
          View Memorial
        </Button>
      </div>
    </Card>
  );
};

export default MemoryCard;