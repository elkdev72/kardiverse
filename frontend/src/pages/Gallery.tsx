import { Heart, Music, BookOpen, Camera, Cross, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import MemoryCard from "@/components/MemoryCard";

// Import generated images
import christianWoman2 from "@/assets/christian-woman-2.jpg";
import christianMan2 from "@/assets/christian-man-2.jpg";
import christianWoman3 from "@/assets/christian-woman-3.jpg";
import christianMan3 from "@/assets/christian-man-3.jpg";
import muslimWoman1 from "@/assets/muslim-woman-1.jpg";
import muslimMan1 from "@/assets/muslim-man-1.jpg";
import muslimWoman2 from "@/assets/muslim-woman-2.jpg";
import muslimMan2 from "@/assets/muslim-man-2.jpg";
import muslimWoman3 from "@/assets/muslim-woman-3.jpg";
import muslimMan3 from "@/assets/muslim-man-3.jpg";

const Gallery = () => {
  const memoryCards: Array<{
    id: number;
    name: string;
    dates: string;
    image: string;
    religion: "Christian" | "Muslim";
    categories: string[];
    description: string;
    qrCode: boolean;
  }> = [
    {
      id: 1,
      name: "Margaret Rose Johnson",
      dates: "1934 - 2024",
      image: "/lovable-uploads/c9598d29-7ae3-44ae-b7b4-afd5a49d30d9.png",
      religion: "Christian",
      categories: ["Life Moments", "Family Tree", "Spiritual Room"],
      description: "A devoted mother and grandmother who touched many lives with her kindness.",
      qrCode: true
    },
    {
      id: 2,
      name: "Robert William Smith",
      dates: "1942 - 2024",
      image: "/lovable-uploads/5afb8904-fd85-4b6d-aeb9-d8a1bf6dc1e7.png",
      religion: "Christian",
      categories: ["Voice & Stories", "Life Moments", "Family Tree"],
      description: "A veteran and storyteller who shared wisdom through his experiences.",
      qrCode: true
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      dates: "1945 - 2024",
      image: muslimWoman1,
      religion: "Muslim",
      categories: ["Spiritual Room", "Family Tree", "Life Moments"],
      description: "A faithful servant of Allah who dedicated her life to her family and community.",
      qrCode: true
    },
    {
      id: 4,
      name: "Ahmad Hassan",
      dates: "1938 - 2024",
      image: muslimMan1,
      religion: "Muslim",
      categories: ["Voice & Stories", "Spiritual Room", "Life Moments"],
      description: "A scholar and imam who guided many on the path of righteousness.",
      qrCode: true
    },
    {
      id: 5,
      name: "Sarah Elizabeth Thompson",
      dates: "1950 - 2024",
      image: christianWoman2,
      religion: "Christian",
      categories: ["Life Moments", "Voice & Stories", "Family Tree"],
      description: "A teacher and pianist who spread joy through music and education.",
      qrCode: true
    },
    {
      id: 6,
      name: "Michael David Rodriguez",
      dates: "1948 - 2024",
      image: christianMan2,
      religion: "Christian",
      categories: ["Family Tree", "Life Moments", "Voice & Stories"],
      description: "A carpenter and family man who built both homes and lasting relationships.",
      qrCode: true
    },
    {
      id: 7,
      name: "Aisha Mahmoud",
      dates: "1952 - 2024",
      image: muslimWoman2, 
      religion: "Muslim",
      categories: ["Spiritual Room", "Voice & Stories", "Family Tree"],
      description: "A midwife who helped bring new life into the world with compassion.",
      qrCode: true
    },
    {
      id: 8,
      name: "Omar Abdullah",
      dates: "1940 - 2024",
      image: muslimMan2,
      religion: "Muslim", 
      categories: ["Life Moments", "Family Tree", "Spiritual Room"],
      description: "A merchant and philanthropist who shared his blessings with those in need.",
      qrCode: true
    },
    {
      id: 9,
      name: "Dorothy Grace Williams",
      dates: "1935 - 2024",
      image: christianWoman3,
      religion: "Christian",
      categories: ["Spiritual Room", "Life Moments", "Voice & Stories"],
      description: "A choir director who led congregations in worship for over 40 years.",
      qrCode: true
    },
    {
      id: 10,
      name: "James Patrick O'Connor",
      dates: "1944 - 2024", 
      image: christianMan3,
      religion: "Christian",
      categories: ["Voice & Stories", "Life Moments", "Family Tree"],
      description: "A firefighter and community leader who served others throughout his life.",
      qrCode: true
    },
    {
      id: 11,
      name: "Khadija Ibrahim",
      dates: "1947 - 2024",
      image: muslimWoman3,
      religion: "Muslim",
      categories: ["Family Tree", "Spiritual Room", "Life Moments"],
      description: "A mother of seven who raised her children with love and Islamic values.",
      qrCode: true
    },
    {
      id: 12,
      name: "Yusuf Mohamed",
      dates: "1943 - 2024",
      image: muslimMan3, 
      religion: "Muslim",
      categories: ["Life Moments", "Voice & Stories", "Spiritual Room"],
      description: "An engineer and community builder who helped construct mosques and schools.",
      qrCode: true
    }
  ];

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

        {/* Filter Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Badge variant="secondary" className="px-4 py-2 bg-divine-gold/20 text-eternal-bronze border-divine-gold/30">
            <Cross className="w-4 h-4 mr-2" />
            Christian
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 bg-heavenly-blue/20 text-primary border-heavenly-blue/30">
            <Moon className="w-4 h-4 mr-2" />
            Muslim
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            All Memories
          </Badge>
        </div>

        {/* Memory Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memoryCards.map((card) => (
            <MemoryCard key={card.id} {...card} />
          ))}
        </div>

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