import { Menu, Home, Grid, Eye, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Welcome", icon: Home },
    { path: "/gallery", label: "Gallery", icon: Grid },
    { path: "/wakeroom", label: "WakeRoom", icon: Eye },
    { path: "/timeline", label: "Timeline", icon: Clock },
    { path: "/legacy", label: "Legacy", icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full bg-peaceful-white/80 backdrop-blur-sm border-b border-blessed-beige/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-full bg-divine-gold/20 flex items-center justify-center">
              <span className="text-eternal-bronze font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-light text-primary tracking-wide hidden sm:block">
              Museum of Memory
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-divine-gold/20 text-eternal-bronze hover:bg-divine-gold/30"
                    : "text-muted-foreground hover:text-primary hover:bg-blessed-beige/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-peaceful-white border-blessed-beige/30">
                <SheetHeader>
                  <SheetTitle className="text-primary">Museum of Memory</SheetTitle>
                  <SheetDescription className="text-muted-foreground">
                    Navigate through our sacred digital spaces
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={isActive(item.path) ? "default" : "ghost"}
                      onClick={() => navigate(item.path)}
                      className={`flex items-center gap-3 justify-start px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive(item.path)
                          ? "bg-divine-gold/20 text-eternal-bronze"
                          : "text-muted-foreground hover:text-primary hover:bg-blessed-beige/50"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;