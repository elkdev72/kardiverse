import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface LifeMomentsCardProps {
  title: string;
  date: string;
  image: string;
  children?: ReactNode;
  onClick?: () => void;
}

export const LifeMomentsCard = ({
  title,
  date,
  image,
  children,
  onClick
}: LifeMomentsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    >
      <div className="flex items-center p-4 gap-4">
        <div className="w-48 h-32 rounded-lg overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-serif text-[#8B4513]">{title}</h3>
          <p className="text-[#8B4513] opacity-75">{date}</p>
          {children && (
            <div className="mt-2 text-[#8B4513] opacity-90">
              {children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
