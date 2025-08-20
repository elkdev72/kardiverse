import { Shield, Star, Infinity, Gem, Crown, Heart, Loader2, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useLicenseFeatures, useFomoLicenses, useLegacyStats } from "@/hooks/use-api";
import { type LicenseFeature, type LegacyLicense } from "@/lib/api";

const Legacy = () => {
  const { data: licenseFeatures, isLoading: isLoadingFeatures } = useLicenseFeatures();
  const { data: fomoLicenses, isLoading: isLoadingLicenses } = useFomoLicenses();
  const { data: legacyStats } = useLegacyStats();

  // Calculate availability statistics
  const totalLicenses = 250;
  const soldLicenses = fomoLicenses?.filter(license => license.status === 'sold').length || 0;
  const availableLicenses = totalLicenses - soldLicenses;
  const soldPercentage = (soldLicenses / totalLicenses) * 100;

  // Icon mapping for license features
  const getFeatureIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'shield':
        return Shield;
      case 'star':
        return Star;
      case 'infinity':
        return Infinity;
      case 'gem':
        return Gem;
      case 'crown':
        return Crown;
      case 'heart':
        return Heart;
      case 'trendingup':
        return TrendingUp;
      case 'users':
        return Users;
      case 'zap':
        return Zap;
      default:
        return Star;
    }
  };

  if (isLoadingFeatures || isLoadingLicenses) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sacred-cream via-peaceful-white to-blessed-beige">
        <Navigation />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center py-16">
            <Loader2 className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-divine-gold mx-auto mb-4" />
            <p className="text-muted-foreground">Loading legacy license information...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-cream via-peaceful-white to-blessed-beige">
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light mb-6 text-primary tracking-wide">
            LEGACY
            <span className="block text-divine-gold font-normal">LICENSES</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Secure your family's digital heritage with FOMO 250 Limited Edition licenses. 
            Only 250 lifetime tokens available worldwide.
          </p>
        </div>

        {/* FOMO License Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="relative overflow-hidden bg-gradient-to-br from-divine-gold/10 via-peaceful-white to-heavenly-blue/10 border-2 border-divine-gold/30 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-divine-gold/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-heavenly-blue/20 rounded-full blur-2xl"></div>
            
            <div className="relative p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-divine-gold/20 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-eternal-bronze" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-primary">FOMO 250</h2>
                  <p className="text-divine-gold font-semibold">Limited Edition</p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="text-6xl font-light text-primary mb-2">
                  <span className="line-through text-muted-foreground text-2xl mr-4">$2,999</span>
                  $1,999
                </div>
                <p className="text-muted-foreground">One-time payment • Lifetime access</p>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <Badge className="bg-divine-gold/20 text-eternal-bronze border-divine-gold/30 px-4 py-2">
                  Limited to 250 licenses
                </Badge>
                <Badge className="bg-heavenly-blue/20 text-primary border-heavenly-blue/30 px-4 py-2">
                  Digital Immortality Included
                </Badge>
              </div>
              
              <Button className="bg-divine-gold hover:bg-eternal-bronze text-primary px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Secure Your Legacy License
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        {licenseFeatures && licenseFeatures.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {licenseFeatures.map((feature) => {
              const IconComponent = getFeatureIcon(feature.icon_name);
              return (
                <Card key={feature.id} className="p-6 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-divine-gold/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-eternal-bronze" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{feature.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                      {feature.category && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {feature.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* No Features State */}
        {(!licenseFeatures || licenseFeatures.length === 0) && (
          <div className="text-center py-16 mb-16">
            <div className="max-w-md mx-auto">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">No License Features</h3>
              <p className="text-muted-foreground">
                License features are not available at the moment.
              </p>
            </div>
          </div>
        )}

        {/* Scarcity Counter */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30 text-center">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Availability Status</h3>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-divine-gold mb-1">{soldLicenses}</div>
                <p className="text-sm text-muted-foreground">Licenses Sold</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-1">{availableLicenses}</div>
                <p className="text-sm text-muted-foreground">Still Available</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-eternal-bronze mb-1">{totalLicenses}</div>
                <p className="text-sm text-muted-foreground">Total Limited</p>
              </div>
            </div>
            
            <div className="w-full bg-blessed-beige rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-divine-gold to-eternal-bronze h-3 rounded-full transition-all duration-1000" 
                style={{width: `${soldPercentage}%`}}
              ></div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Once all 250 licenses are sold, this offer will never be available again.
            </p>
          </Card>
        </div>

        {/* Testimonials/Benefits */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30">
            <h3 className="text-xl font-semibold mb-4 text-primary">Why FOMO 250?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-divine-gold flex-shrink-0 mt-0.5" />
                <span>Exclusive access to premium features and future updates</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-divine-gold flex-shrink-0 mt-0.5" />
                <span>Priority technical support and customer service</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-divine-gold flex-shrink-0 mt-0.5" />
                <span>Become part of an exclusive community of legacy preservers</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="w-5 h-5 text-divine-gold flex-shrink-0 mt-0.5" />
                <span>Transferable license - can be passed to family members</span>
              </li>
            </ul>
          </Card>
          
          <Card className="p-8 bg-peaceful-white/80 backdrop-blur-sm border-blessed-beige/30">
            <h3 className="text-xl font-semibold mb-4 text-primary">Digital Immortality Guarantee</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your memories, stories, and digital legacy will be preserved for eternity through our 
              distributed cloud infrastructure and blockchain verification system.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-5 h-5 text-heavenly-blue" />
              <span className="text-primary font-medium">99.99% Uptime Guarantee</span>
            </div>
            <div className="flex items-center gap-3 text-sm mt-2">
              <Infinity className="w-5 h-5 text-divine-gold" />
              <span className="text-primary font-medium">Lifetime Preservation Promise</span>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Legacy;