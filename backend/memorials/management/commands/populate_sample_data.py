from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from memorials.models import Memorial
from timeline.models import LifePhase, TimelineStory
from legacy.models import LegacyLicense, LicenseFeature
from wakeroom.models import WakeRoomExperience, WakeRoomFeature

class Command(BaseCommand):
    help = 'Populate database with sample data for Museum of Memory'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create sample memorials
        self.create_sample_memorials()
        
        # Create life phases
        self.create_life_phases()
        
        # Create timeline stories
        self.create_timeline_stories()
        
        # Create license features
        self.create_license_features()
        
        # Create sample licenses
        self.create_sample_licenses()
        
        # Create WakeRoom features
        self.create_wakeroom_features()
        
        # Create sample WakeRoom experiences
        self.create_sample_wakeroom_experiences()
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))

    def create_sample_memorials(self):
        """Create sample memorials"""
        memorials_data = [
            {
                'name': 'Margaret Rose Johnson',
                'dates': '1934 - 2024',
                'religion': 'Christian',
                'categories': ['Life Moments', 'Family Tree', 'Spiritual Room'],
                'description': 'A devoted mother and grandmother who touched many lives with her kindness.',
                'qr_code': True,
                'language': 'en'
            },
            {
                'name': 'Robert William Smith',
                'dates': '1942 - 2024',
                'religion': 'Christian',
                'categories': ['Voice & Stories', 'Life Moments', 'Family Tree'],
                'description': 'A veteran and storyteller who shared wisdom through his experiences.',
                'qr_code': True,
                'language': 'en'
            },
            {
                'name': 'Fatima Al-Zahra',
                'dates': '1945 - 2024',
                'religion': 'Muslim',
                'categories': ['Spiritual Room', 'Family Tree', 'Life Moments'],
                'description': 'A faithful servant of Allah who dedicated her life to her family and community.',
                'qr_code': True,
                'language': 'en'
            },
            {
                'name': 'Ahmad Hassan',
                'dates': '1938 - 2024',
                'religion': 'Muslim',
                'categories': ['Voice & Stories', 'Spiritual Room', 'Life Moments'],
                'description': 'A scholar and imam who guided many on the path of righteousness.',
                'qr_code': True,
                'language': 'en'
            },
            {
                'name': 'Sarah Elizabeth Thompson',
                'dates': '1950 - 2024',
                'religion': 'Christian',
                'categories': ['Life Moments', 'Voice & Stories', 'Family Tree'],
                'description': 'A teacher and pianist who spread joy through music and education.',
                'qr_code': True,
                'language': 'en'
            },
            {
                'name': 'Michael David Rodriguez',
                'dates': '1948 - 2024',
                'religion': 'Christian',
                'categories': ['Family Tree', 'Life Moments', 'Voice & Stories'],
                'description': 'A carpenter and family man who built both homes and lasting relationships.',
                'qr_code': True,
                'language': 'en'
            }
        ]
        
        for data in memorials_data:
            Memorial.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
        
        self.stdout.write(f'Created {len(memorials_data)} sample memorials')

    def create_life_phases(self):
        """Create the 5 life phases"""
        phases_data = [
            {
                'phase': 'Birth & Childhood',
                'age_range': '0-12 years',
                'icon_name': 'Baby',
                'color_class': 'bg-divine-gold/20',
                'icon_color_class': 'text-eternal-bronze',
                'description': 'The foundation years filled with wonder, learning, and family bonds.',
                'milestones': [
                    'First steps and words',
                    'School days and friendships', 
                    'Family traditions and holidays',
                    'Childhood dreams and innocence'
                ],
                'spiritual_aspect': 'Formation of faith and values through family guidance',
                'order': 1
            },
            {
                'phase': 'Youth & Learning',
                'age_range': '13-25 years',
                'icon_name': 'GraduationCap',
                'color_class': 'bg-heavenly-blue/20',
                'icon_color_class': 'text-primary',
                'description': 'A time of growth, education, and discovering one\'s purpose in life.',
                'milestones': [
                    'Education and academic achievements',
                    'Coming of age ceremonies',
                    'First loves and heartbreaks',
                    'Career aspirations emerge'
                ],
                'spiritual_aspect': 'Deepening understanding of faith and personal spiritual journey',
                'order': 2
            },
            {
                'phase': 'Love & Partnership',
                'age_range': '26-40 years',
                'icon_name': 'Heart',
                'color_class': 'bg-divine-gold/20',
                'icon_color_class': 'text-eternal-bronze',
                'description': 'Building relationships, starting families, and creating lasting bonds.',
                'milestones': [
                    'Finding life partner',
                    'Wedding celebrations',
                    'Birth of children',
                    'Building a home together'
                ],
                'spiritual_aspect': 'Shared faith journey and raising children in spiritual values',
                'order': 3
            },
            {
                'phase': 'Service & Achievement',
                'age_range': '41-65 years',
                'icon_name': 'Briefcase',
                'color_class': 'bg-heavenly-blue/20',
                'icon_color_class': 'text-primary',
                'description': 'Peak years of career, community service, and mentoring others.',
                'milestones': [
                    'Career accomplishments',
                    'Community leadership',
                    'Mentoring younger generations',
                    'Financial stability and security'
                ],
                'spiritual_aspect': 'Using talents and blessings to serve community and faith',
                'order': 4
            },
            {
                'phase': 'Wisdom & Legacy',
                'age_range': '66+ years',
                'icon_name': 'TreePine',
                'color_class': 'bg-divine-gold/20',
                'icon_color_class': 'text-eternal-bronze',
                'description': 'The golden years of sharing wisdom and leaving a lasting legacy.',
                'milestones': [
                    'Grandchildren and great-grandchildren',
                    'Retirement and new adventures',
                    'Sharing life stories and wisdom',
                    'Legacy planning and giving'
                ],
                'spiritual_aspect': 'Reflection on life\'s journey and preparation for eternal peace',
                'order': 5
            }
        ]
        
        for data in phases_data:
            LifePhase.objects.get_or_create(
                phase=data['phase'],
                defaults=data
            )
        
        self.stdout.write(f'Created {len(phases_data)} life phases')

    def create_timeline_stories(self):
        """Create sample timeline stories"""
        # Get first memorial and first life phase
        try:
            memorial = Memorial.objects.first()
            phase = LifePhase.objects.first()
            
            if memorial and phase:
                story_data = {
                    'title': 'First Steps',
                    'content': 'Margaret took her first steps in the spring of 1935, bringing joy to her parents and marking the beginning of a remarkable journey.',
                    'life_phase': phase,
                    'memorial': memorial,
                    'is_featured': True
                }
                
                TimelineStory.objects.get_or_create(
                    title=story_data['title'],
                    memorial=memorial,
                    defaults=story_data
                )
                
                self.stdout.write('Created sample timeline story')
        except Exception as e:
            self.stdout.write(f'Could not create timeline story: {e}')

    def create_license_features(self):
        """Create license features"""
        features_data = [
            {
                'name': 'Digital Immortality',
                'description': 'Your memories preserved forever in the cloud',
                'icon_name': 'Infinity',
                'category': 'Storage',
                'is_active': True
            },
            {
                'name': 'AR/VR Access',
                'description': 'Immersive experiences through WakeRoom technology',
                'icon_name': 'Star',
                'category': 'Technology',
                'is_active': True
            },
            {
                'name': 'Multi-Generation Sharing',
                'description': 'Pass down stories to future generations',
                'icon_name': 'Heart',
                'category': 'Sharing',
                'is_active': True
            },
            {
                'name': 'Premium Storage',
                'description': 'Unlimited photos, videos, and audio recordings',
                'icon_name': 'Gem',
                'category': 'Storage',
                'is_active': True
            },
            {
                'name': 'AI Enhancement',
                'description': 'Advanced AI storytelling and memory organization',
                'icon_name': 'Crown',
                'category': 'Technology',
                'is_active': True
            },
            {
                'name': 'Lifetime Guarantee',
                'description': 'One-time purchase, eternal preservation',
                'icon_name': 'Shield',
                'category': 'Security',
                'is_active': True
            }
        ]
        
        for data in features_data:
            LicenseFeature.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
        
        self.stdout.write(f'Created {len(features_data)} license features')

    def create_sample_licenses(self):
        """Create sample FOMO 250 licenses"""
        # Get features for the first license
        features = LicenseFeature.objects.all()[:3]
        feature_names = [f.name for f in features]
        
        # Create first few licenses
        for i in range(1, 6):
            license_data = {
                'license_number': i,
                'license_type': 'FOMO_250',
                'status': 'available',
                'original_price': 2999.00,
                'current_price': 1999.00,
                'features': feature_names,
                'storage_limit_gb': 1000,
                'family_members_limit': 100,
                'lifetime_guarantee': True
            }
            
            LegacyLicense.objects.get_or_create(
                license_number=i,
                defaults=license_data
            )
        
        self.stdout.write('Created 5 sample FOMO 250 licenses')

    def create_wakeroom_features(self):
        """Create WakeRoom features"""
        features_data = [
            {
                'name': 'Augmented Reality',
                'description': 'Experience memories in 3D space with interactive AR elements',
                'icon_name': 'Eye',
                'feature_type': 'Technology',
                'is_active': True
            },
            {
                'name': 'Spatial Audio',
                'description': 'Immersive soundscapes and voice recordings',
                'icon_name': 'Headphones',
                'feature_type': 'Audio',
                'is_active': True
            },
            {
                'name': 'QR Access',
                'description': 'Instant access through QR codes on memorial cards',
                'icon_name': 'QrCode',
                'feature_type': 'Access',
                'is_active': True
            }
        ]
        
        for data in features_data:
            WakeRoomFeature.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
        
        self.stdout.write(f'Created {len(features_data)} WakeRoom features')

    def create_sample_wakeroom_experiences(self):
        """Create sample WakeRoom experiences"""
        try:
            memorial = Memorial.objects.first()
            
            if memorial:
                experience_data = {
                    'title': 'Sacred Memory Walk',
                    'description': 'A peaceful walk through cherished memories with spatial audio and gentle AR elements.',
                    'experience_type': 'AR',
                    'status': 'active',
                    'duration_minutes': 10,
                    'is_immersive': True,
                    'requires_headset': False,
                    'spatial_audio': True,
                    'is_featured': True
                }
                
                experience = WakeRoomExperience.objects.get_or_create(
                    title=experience_data['title'],
                    defaults=experience_data
                )[0]
                
                # Associate with memorial
                experience.associated_memorials.add(memorial)
                
                self.stdout.write('Created sample WakeRoom experience')
        except Exception as e:
            self.stdout.write(f'Could not create WakeRoom experience: {e}') 