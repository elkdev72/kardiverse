import { Camera, Video, Music, BookOpen, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MediaTypeOption {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface MediaTypeSelectorProps {
  selected?: string;
  onSelect?: (value: string) => void;
}

export const MediaTypeSelector = ({ selected, onSelect }: MediaTypeSelectorProps) => {
  const mediaTypes: MediaTypeOption[] = [
    { icon: Camera, label: "Photos", value: "photo" },
    { icon: Video, label: "Videos", value: "video" },
    { icon: Music, label: "Audio", value: "audio" },
    { icon: BookOpen, label: "Poetry", value: "poetry" }
  ];

  return (
    <div className="flex justify-center gap-8 my-6">
      {mediaTypes.map(({ icon: Icon, label, value }) => (
        <motion.div
          key={value}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelect?.(value)}
          className={`flex flex-col items-center cursor-pointer
            ${selected === value ? "opacity-100" : "opacity-70"}`}
        >
          <div className={`w-12 h-12 rounded-full bg-white shadow-lg 
            flex items-center justify-center mb-2
            ${selected === value ? "ring-2 ring-[#8B4513]" : ""}`}
          >
            <Icon className="w-6 h-6 text-[#8B4513]" />
          </div>
          <span className="text-sm text-[#8B4513]">{label}</span>
        </motion.div>
      ))}
    </div>
  );
};
