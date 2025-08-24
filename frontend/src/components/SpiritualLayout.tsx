import { motion } from "framer-motion";
import { type ReactNode } from "react";
import Navigation from "./Navigation";

interface SpiritualLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerContent?: ReactNode;
}

const SpiritualLayout = ({
  children,
  title,
  subtitle,
  headerContent
}: SpiritualLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF6EC] via-white to-[#F5E6D3]">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {(title || subtitle || headerContent) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {title && (
              <h1 className="text-4xl font-serif text-[#8B4513] mb-4">{title}</h1>
            )}
            {subtitle && (
              <p className="text-xl text-[#8B4513]/80 mb-6">{subtitle}</p>
            )}
            {headerContent}
          </motion.div>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default SpiritualLayout;
