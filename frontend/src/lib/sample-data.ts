import { type Memorial, type LifePhase, type TimelineStory, type LicenseFeature, type LegacyLicense, type WakeRoomExperience, type WakeRoomFeature } from './api';

// Import images for memorials
import muslimMan1 from '../assets/muslim-man-1.jpg';
import muslimMan2 from '../assets/muslim-man-2.jpg';
import muslimMan3 from '../assets/muslim-man-3.jpg';
import muslimWoman1 from '../assets/muslim-woman-1.jpg';
import muslimWoman2 from '../assets/muslim-woman-2.jpg';
import muslimWoman3 from '../assets/muslim-woman-3.jpg';
import christianMan1 from '../assets/christian-man-1.jpg';
import christianMan2 from '../assets/christian-man-2.jpg';
import christianMan3 from '../assets/christian-man-3.jpg';
import christianWoman1 from '../assets/christian-woman-1.jpg';
import christianWoman2 from '../assets/christian-woman-2.jpg';
import christianWoman3 from '../assets/christian-woman-3.jpg';

// Sample Memorials - Mix of Christian and Muslim
export const sampleMemorials: Memorial[] = [
  {
    id: 1,
    name: "Ahmad Hassan Al-Rashid",
    dates: "1945 - 2023",
    birth_date: "1945-03-15",
    death_date: "2023-11-22",
    image: null,
         image_url: muslimMan1,
    religion: "Muslim",
    categories: ["Life Moments", "Voice & Stories", "Family Tree"],
    description: "Beloved father and community leader who dedicated his life to serving others through his work as a teacher and mosque volunteer.",
    qr_code: true,
    qr_code_data: "memorial_001_ahmad",
    family_members: ["Fatima Al-Rashid", "Omar Hassan", "Aisha Hassan"],
    life_story: "Born in Cairo, Egypt, Ahmad moved to the United States in 1970 where he built a life centered around faith, family, and education.",
    favorite_quotes: ["'The best of people are those who are most beneficial to people'", "'Seek knowledge from the cradle to the grave'"],
    achievements: ["Master's Degree in Education", "30 years teaching high school", "Community service award 2015"],
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_active: true,
    language: "English",
    religion_icon: "☪️",
    religion_color_class: "bg-heavenly-blue/20 text-primary border-heavenly-blue/30",
    categories_display: "Life Moments, Voice & Stories, Family Tree"
  },
  {
    id: 2,
    name: "Margaret Elizabeth Thompson",
    dates: "1938 - 2023",
    birth_date: "1938-07-04",
    death_date: "2023-09-15",
    image: null,
         image_url: christianWoman2,
    religion: "Christian",
    categories: ["Life Moments", "Spiritual Room", "Voice & Stories"],
    description: "Devoted Christian woman who touched countless lives through her ministry work and gentle spirit.",
    qr_code: true,
    qr_code_data: "memorial_002_margaret",
    family_members: ["Robert Thompson", "Sarah Johnson", "Michael Thompson"],
    life_story: "Margaret was born in rural Kentucky and spent her life spreading God's love through church ministry and community service.",
    favorite_quotes: ["'Let your light shine before others'", "'Faith can move mountains'"],
    achievements: ["Church choir director for 40 years", "Sunday school teacher", "Community outreach coordinator"],
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_active: true,
    language: "English",
    religion_icon: "✝️",
    religion_color_class: "bg-divine-gold/20 text-eternal-bronze border-divine-gold/30",
    categories_display: "Life Moments, Spiritual Room, Voice & Stories"
  },
  {
    id: 3,
    name: "Fatima Zahra Khan",
    dates: "1952 - 2023",
    birth_date: "1952-11-08",
    death_date: "2023-10-30",
    image: null,
         image_url: muslimWoman1,
    religion: "Muslim",
    categories: ["Family Tree", "Voice & Stories", "Spiritual Room"],
    description: "Loving mother and grandmother who preserved family traditions and Islamic values for future generations.",
    qr_code: true,
    qr_code_data: "memorial_003_fatima",
    family_members: ["Ali Khan", "Zara Khan", "Hassan Khan"],
    life_story: "Fatima emigrated from Pakistan in 1975 and built a beautiful family while maintaining her cultural and religious heritage.",
    favorite_quotes: ["'The best among you are those who have the best manners'", "'Paradise lies at the feet of mothers'"],
    achievements: ["Community cooking classes", "Islamic art preservation", "Family history documentation"],
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_active: true,
    language: "English",
    religion_icon: "☪️",
    religion_color_class: "bg-heavenly-blue/20 text-primary border-heavenly-blue/30",
    categories_display: "Family Tree, Voice & Stories, Spiritual Room"
  },
  {
    id: 4,
    name: "Reverend James Michael O'Connor",
    dates: "1940 - 2023",
    birth_date: "1940-12-25",
    death_date: "2023-08-12",
    image: null,
         image_url: christianMan2,
    religion: "Christian",
    categories: ["Spiritual Room", "Life Moments", "Voice & Stories"],
    description: "Beloved pastor who served his congregation for over 40 years with wisdom, compassion, and unwavering faith.",
    qr_code: true,
    qr_code_data: "memorial_004_james",
    family_members: ["Mary O'Connor", "Patrick O'Connor", "Elizabeth O'Connor"],
    life_story: "James felt called to ministry at a young age and dedicated his life to spreading the Gospel and helping those in need.",
    favorite_quotes: ["'Love one another as I have loved you'", "'Blessed are the peacemakers'"],
    achievements: ["Doctorate in Theology", "Pastor for 40 years", "Community service award 2010"],
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_active: true,
    language: "English",
    religion_icon: "✝️",
    religion_color_class: "bg-divine-gold/20 text-eternal-bronze border-divine-gold/30",
    categories_display: "Spiritual Room, Life Moments, Voice & Stories"
  },
  {
    id: 5,
    name: "Yusuf Abdullah Rahman",
    dates: "1955 - 2023",
    birth_date: "1955-05-20",
    death_date: "2023-12-05",
    image: null,
         image_url: muslimMan2,
    religion: "Muslim",
    categories: ["Life Moments", "Family Tree", "Voice & Stories"],
    description: "Dedicated father and successful businessman who balanced career success with family values and Islamic principles.",
    qr_code: true,
    qr_code_data: "memorial_005_yusuf",
    family_members: ["Amina Rahman", "Khalid Rahman", "Noor Rahman"],
    life_story: "Yusuf built a successful import-export business while raising a family and contributing to his local mosque community.",
    favorite_quotes: ["'Actions speak louder than words'", "'The best charity is that given in secret'"],
    achievements: ["Business owner for 25 years", "Mosque board member", "Youth mentor"],
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_active: true,
    language: "English",
    religion_icon: "☪️",
    religion_color_class: "bg-heavenly-blue/20 text-primary border-heavenly-blue/30",
    categories_display: "Life Moments, Family Tree, Voice & Stories"
  },
  {
    id: 6,
    name: "Grace Anne Williams",
    dates: "1942 - 2023",
    birth_date: "1942-04-18",
    death_date: "2023-07-28",
    image: null,
         image_url: christianWoman3,
    religion: "Christian",
    categories: ["Voice & Stories", "Life Moments", "Family Tree"],
    description: "Cherished grandmother who shared her faith through storytelling and family traditions.",
    qr_code: true,
    qr_code_data: "memorial_006_grace",
    family_members: ["William Williams", "Jennifer Smith", "David Williams"],
    life_story: "Grace was known for her beautiful voice in the church choir and her ability to make every family gathering special.",
    favorite_quotes: ["'This is the day the Lord has made'", "'Let us rejoice and be glad in it'"],
    achievements: ["Church choir member for 50 years", "Family historian", "Community volunteer"],
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_active: true,
    language: "English",
    religion_icon: "✝️",
    religion_color_class: "bg-divine-gold/20 text-eternal-bronze border-divine-gold/30",
    categories_display: "Voice & Stories, Life Moments, Family Tree"
  }
];

// Sample Life Phases
export const sampleLifePhases: LifePhase[] = [
  {
    id: 1,
    phase: "Childhood & Early Years",
    age_range: "0-18 years",
    icon_name: "baby",
    color_class: "bg-divine-gold/20",
    icon_color_class: "text-eternal-bronze",
    description: "The foundation years filled with wonder, learning, and spiritual awakening.",
    milestones: ["First steps", "First words", "School beginnings", "Religious education"],
    spiritual_aspect: "Innocence and divine wonder, the pure connection to God's creation.",
    order: 1,
    is_active: true,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z"
  },
  {
    id: 2,
    phase: "Education & Growth",
    age_range: "18-25 years",
    icon_name: "graduationcap",
    color_class: "bg-heavenly-blue/20",
    icon_color_class: "text-primary",
    description: "Years of learning, discovery, and deepening spiritual understanding.",
    milestones: ["Higher education", "Career preparation", "Spiritual studies", "Community involvement"],
    spiritual_aspect: "Seeking wisdom and knowledge as a path to divine understanding.",
    order: 2,
    is_active: true,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z"
  },
  {
    id: 3,
    phase: "Love & Family",
    age_range: "25-40 years",
    icon_name: "heart",
    color_class: "bg-divine-gold/20",
    icon_color_class: "text-eternal-bronze",
    description: "Building relationships, starting families, and nurturing spiritual bonds.",
    milestones: ["Marriage", "Children", "Family traditions", "Spiritual leadership"],
    spiritual_aspect: "Love as a reflection of divine love, family as sacred community.",
    order: 3,
    is_active: true,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z"
  },
  {
    id: 4,
    phase: "Career & Service",
    age_range: "40-60 years",
    icon_name: "briefcase",
    color_class: "bg-heavenly-blue/20",
    icon_color_class: "text-primary",
    description: "Professional achievement, community service, and spiritual mentorship.",
    milestones: ["Career success", "Community service", "Mentoring others", "Spiritual guidance"],
    spiritual_aspect: "Using talents and skills to serve others and honor God's gifts.",
    order: 4,
    is_active: true,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z"
  },
  {
    id: 5,
    phase: "Wisdom & Legacy",
    age_range: "60+ years",
    icon_name: "treepine",
    color_class: "bg-divine-gold/20",
    icon_color_class: "text-eternal-bronze",
    description: "Sharing wisdom, preserving memories, and preparing spiritual legacy.",
    milestones: ["Retirement", "Grandparenting", "Storytelling", "Spiritual legacy"],
    spiritual_aspect: "Passing on wisdom and faith to future generations.",
    order: 5,
    is_active: true,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z"
  }
];

// Sample License Features
export const sampleLicenseFeatures: LicenseFeature[] = [
  {
    id: 1,
    name: "Digital Immortality",
    description: "Your memories and legacy will be preserved forever in our secure cloud infrastructure.",
    icon_name: "infinity",
    category: "Core Feature",
    is_active: true
  },
  {
    id: 2,
    name: "Unlimited Storage",
    description: "Store unlimited photos, videos, audio recordings, and documents.",
    icon_name: "database",
    category: "Storage",
    is_active: true
  },
  {
    id: 3,
    name: "Family Access",
    description: "Share access with unlimited family members across generations.",
    icon_name: "users",
    category: "Sharing",
    is_active: true
  },
  {
    id: 4,
    name: "AI Storytelling",
    description: "Advanced AI that helps create and preserve life stories automatically.",
    icon_name: "brain",
    category: "AI Features",
    is_active: true
  },
  {
    id: 5,
    name: "QR Code Integration",
    description: "Physical memorial cards with QR codes for easy access.",
    icon_name: "qrcode",
    category: "Physical",
    is_active: true
  },
  {
    id: 6,
    name: "Multi-Language Support",
    description: "Support for English, Swahili, and other languages.",
    icon_name: "globe",
    category: "Accessibility",
    is_active: true
  }
];

// Sample FOMO Licenses
export const sampleFomoLicenses: LegacyLicense[] = [
  {
    id: "fomo_001",
    license_id: "FOMO250-001",
    license_number: 1,
    license_type: "FOMO 250 Limited Edition",
    status: "sold",
    original_price: "2999.00",
    current_price: "1999.00",
    is_discounted: true,
    discount_percentage: 33,
    features: ["Digital Immortality", "Unlimited Storage", "Family Access"],
    storage_limit_gb: 1000,
    family_members_limit: 100,
    lifetime_guarantee: true,
    purchaser: 1,
    purchase_date: "2023-11-15T10:00:00Z",
    payment_method: "Credit Card",
    transaction_id: "TXN_001",
    created_at: "2023-11-15T10:00:00Z",
    updated_at: "2023-11-15T10:00:00Z",
    expires_at: null,
    is_available: false
  },
  {
    id: "fomo_002",
    license_id: "FOMO250-002",
    license_number: 2,
    license_type: "FOMO 250 Limited Edition",
    status: "available",
    original_price: "2999.00",
    current_price: "1999.00",
    is_discounted: true,
    discount_percentage: 33,
    features: ["Digital Immortality", "Unlimited Storage", "Family Access"],
    storage_limit_gb: 1000,
    family_members_limit: 100,
    lifetime_guarantee: true,
    purchaser: null,
    purchase_date: null,
    payment_method: "",
    transaction_id: "",
    created_at: "2023-11-15T10:00:00Z",
    updated_at: "2023-11-15T10:00:00Z",
    expires_at: null,
    is_available: true
  }
];

// Sample WakeRoom Experiences
export const sampleWakeRoomExperiences: WakeRoomExperience[] = [
  {
    id: 1,
    title: "Virtual Memorial Service",
    description: "Experience a sacred digital memorial service with 3D visualization and spatial audio.",
    experience_type: "Memorial Service",
    status: "active",
    demo_video: null,
    thumbnail_image: null,
    thumbnail_url: "/placeholder-memorial.jpg",
    ar_model_file: null,
    vr_scene_file: null,
    qr_code_required: true,
    qr_code_data: "wakeroom_001",
    nfc_enabled: false,
    nfc_data: "",
    duration_minutes: 15,
    is_immersive: true,
    requires_headset: false,
    spatial_audio: true,
    associated_memorials: [1, 2, 3],
    created_by: 1,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_featured: true
  },
  {
    id: 2,
    title: "Family Story Time",
    description: "Interactive storytelling experience with family photos and voice recordings.",
    experience_type: "Storytelling",
    status: "active",
    demo_video: null,
    thumbnail_image: null,
    thumbnail_url: "/placeholder-memorial.jpg",
    ar_model_file: null,
    vr_scene_file: null,
    qr_code_required: false,
    qr_code_data: "wakeroom_002",
    nfc_enabled: false,
    nfc_data: "",
    duration_minutes: 10,
    is_immersive: true,
    requires_headset: false,
    spatial_audio: false,
    associated_memorials: [4, 5, 6],
    created_by: 1,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_featured: true
  },
  {
    id: 3,
    title: "Spiritual Reflection Room",
    description: "Peaceful meditation space with ambient sounds and guided spiritual practices.",
    experience_type: "Meditation",
    status: "active",
    demo_video: null,
    thumbnail_image: null,
    thumbnail_url: "/placeholder-memorial.jpg",
    ar_model_file: null,
    vr_scene_file: null,
    qr_code_required: false,
    qr_code_data: "wakeroom_003",
    nfc_enabled: false,
    nfc_data: "",
    duration_minutes: 20,
    is_immersive: true,
    requires_headset: false,
    spatial_audio: true,
    associated_memorials: [1, 2, 3, 4, 5, 6],
    created_by: 1,
    created_at: "2023-12-01T10:00:00Z",
    updated_at: "2023-12-01T10:00:00Z",
    is_featured: true
  }
];

// Sample WakeRoom Features
export const sampleWakeRoomFeatures: WakeRoomFeature[] = [
  {
    id: 1,
    name: "Augmented Reality",
    description: "Overlay digital memories onto the physical world through your smartphone camera.",
    icon_name: "eye",
    is_active: true,
    feature_type: "AR Technology",
    technical_requirements: ["Smartphone with AR capabilities", "iOS 13+ or Android 8+"]
  },
  {
    id: 2,
    name: "Spatial Audio",
    description: "3D audio experience that makes memories feel alive and present.",
    icon_name: "headphones",
    is_active: true,
    feature_type: "Audio Technology",
    technical_requirements: ["Stereo headphones", "Modern web browser"]
  },
  {
    id: 3,
    name: "QR Code Integration",
    description: "Quick access to WakeRoom experiences by scanning memorial cards.",
    icon_name: "qrcode",
    is_active: true,
    feature_type: "Access Control",
    technical_requirements: ["Smartphone camera", "QR code scanner app"]
  },
  {
    id: 4,
    name: "Mobile AR",
    description: "Full AR experience optimized for mobile devices and tablets.",
    icon_name: "smartphone",
    is_active: true,
    feature_type: "Mobile Technology",
    technical_requirements: ["ARCore (Android) or ARKit (iOS)", "Modern smartphone"]
  },
  {
    id: 5,
    name: "3D Visualization",
    description: "Interactive 3D models and environments for immersive storytelling.",
    icon_name: "video",
    is_active: true,
    feature_type: "Visual Technology",
    technical_requirements: ["WebGL support", "Modern graphics card"]
  },
  {
    id: 6,
    name: "Global Access",
    description: "Access WakeRoom experiences from anywhere in the world.",
    icon_name: "globe",
    is_active: true,
    feature_type: "Connectivity",
    technical_requirements: ["Internet connection", "Modern web browser"]
  }
];

// Helper function to get sample data
export const getSampleData = () => ({
  memorials: sampleMemorials,
  lifePhases: sampleLifePhases,
  licenseFeatures: sampleLicenseFeatures,
  fomoLicenses: sampleFomoLicenses,
  wakeRoomExperiences: sampleWakeRoomExperiences,
  wakeRoomFeatures: sampleWakeRoomFeatures
});
