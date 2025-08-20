# Museum of Memory - Backend API

This is the Django backend for the Museum of Memory web application, providing comprehensive APIs for memorial management, timeline experiences, legacy licenses, and WakeRoom AR/VR experiences.

## 🚀 Features

### Core Functionality
- **Memorial Management**: Create, read, update, and delete memorial cards with religious and cultural support
- **Timeline System**: Interactive spiritual timeline with 5 life phases and story management
- **Legacy Licenses**: FOMO 250 limited edition license management with purchase tracking
- **WakeRoom Experiences**: AR/VR experience management with session tracking and analytics

### Technical Features
- **RESTful API**: Complete CRUD operations with filtering, search, and pagination
- **Image Processing**: Automatic image resizing and optimization
- **QR Code Support**: Built-in QR code generation for memorials and experiences
- **Multi-language Support**: English and Swahili language support
- **Admin Interface**: Comprehensive Django admin with custom actions
- **CORS Support**: Cross-origin resource sharing for frontend integration

## 🛠️ Technology Stack

- **Framework**: Django 5.2.5
- **API**: Django REST Framework 3.16.1
- **Database**: SQLite (development), PostgreSQL/MySQL ready (production)
- **Image Processing**: Pillow 11.3.0
- **CORS**: django-cors-headers 4.7.0
- **Filtering**: django-filter 24.1

## 📋 Prerequisites

- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Database Setup

```bash
# Create database migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser
```

### 3. Run Development Server

```bash
# Start development server
python manage.py runserver

# Server will be available at http://127.0.0.1:8000/
# Admin interface: http://127.0.0.1:8000/admin/
# API documentation: http://127.0.0.1:8000/api/docs/
```

## 📚 API Endpoints

### Base URL: `/api/v1/`

#### Memorials
- `GET /memorials/` - List all memorials
- `POST /memorials/` - Create new memorial
- `GET /memorials/{id}/` - Get specific memorial
- `PUT /memorials/{id}/` - Update memorial
- `DELETE /memorials/{id}/` - Delete memorial
- `GET /memorials/featured/` - Get featured memorials
- `GET /memorials/by_religion/` - Group by religion
- `GET /memorials/by_category/` - Group by category
- `GET /memorials/search/` - Advanced search
- `GET /memorials/statistics/` - Memorial statistics

#### Timeline
- `GET /timeline/phases/` - List life phases
- `GET /timeline/phases/ordered/` - Get ordered phases with stories
- `GET /timeline/phases/{id}/stories/` - Get stories for phase
- `GET /timeline/phases/complete_timeline/` - Complete timeline
- `GET /timeline/stories/` - List timeline stories
- `GET /timeline/stories/featured/` - Featured stories
- `GET /timeline/stories/by_memorial/` - Stories by memorial
- `GET /timeline/stories/by_phase/` - Stories by phase

#### Legacy Licenses
- `GET /legacy/licenses/` - List all licenses
- `POST /legacy/licenses/` - Create license
- `GET /legacy/licenses/available/` - Available licenses
- `GET /legacy/licenses/featured/` - Featured licenses
- `GET /legacy/licenses/by_type/` - Group by type
- `GET /legacy/licenses/statistics/` - License statistics
- `POST /legacy/licenses/{id}/reserve/` - Reserve license
- `POST /legacy/licenses/{id}/purchase/` - Purchase license

#### WakeRoom
- `GET /wakeroom/experiences/` - List experiences
- `GET /wakeroom/experiences/active/` - Active experiences
- `GET /wakeroom/experiences/featured/` - Featured experiences
- `GET /wakeroom/experiences/by_type/` - Group by type
- `GET /wakeroom/experiences/by_memorial/` - By memorial
- `GET /wakeroom/experiences/{id}/requirements/` - Tech requirements
- `GET /wakeroom/experiences/{id}/media_files/` - Media files
- `GET /wakeroom/experiences/statistics/` - Experience statistics

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (for production)
# DATABASE_URL=postgresql://user:password@localhost/dbname

# Media Storage (for production)
# AWS_ACCESS_KEY_ID=your-aws-key
# AWS_SECRET_ACCESS_KEY=your-aws-secret
# AWS_STORAGE_BUCKET_NAME=your-bucket-name
```

### CORS Settings

The backend is configured to allow requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`

## 📊 Admin Interface

Access the Django admin at `/admin/` to manage:

- **Memorials**: Create and manage memorial cards
- **Timeline**: Configure life phases and stories
- **Legacy Licenses**: Manage FOMO 250 licenses
- **WakeRoom**: Configure AR/VR experiences
- **Users**: Manage user accounts and permissions

## 🧪 Testing

```bash
# Run tests
python manage.py test

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

## 🚀 Production Deployment

### 1. Update Settings

```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']

# Use environment variables for sensitive data
SECRET_KEY = os.environ.get('SECRET_KEY')
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT', '5432'),
    }
}
```

### 2. Static Files

```bash
# Collect static files
python manage.py collectstatic

# Configure web server (nginx, Apache) to serve static files
```

### 3. WSGI Server

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn kardiversebackend.wsgi:application
```

## 📁 Project Structure

```
backend/
├── kardiversebackend/          # Main project settings
├── memorials/                  # Memorial management app
│   ├── models.py              # Memorial data models
│   ├── views.py               # API views and ViewSets
│   ├── serializers.py         # Data serialization
│   └── admin.py               # Admin interface
├── timeline/                   # Timeline and stories app
├── legacy/                     # License management app
├── wakeroom/                   # AR/VR experiences app
├── requirements.txt            # Python dependencies
├── manage.py                   # Django management script
└── README.md                   # This file
```

## 🔗 Frontend Integration

The backend is designed to work seamlessly with the React frontend:

- **CORS enabled** for cross-origin requests
- **JSON API responses** optimized for frontend consumption
- **Image URLs** automatically generated with full paths
- **Pagination** for large datasets
- **Search and filtering** for enhanced user experience

## 📝 API Response Format

All API responses follow a consistent format:

```json
{
    "count": 100,
    "next": "http://api.example.com/endpoint/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "Example Memorial",
            "religion": "Christian",
            "categories": ["Life Moments", "Family Tree"],
            "image_url": "http://api.example.com/media/memorials/image.jpg"
        }
    ]
}
```

## 🆘 Support

For issues and questions:

1. Check the API documentation at `/api/docs/`
2. Review the Django admin interface
3. Check the logs in the `logs/` directory
4. Ensure all dependencies are installed correctly

## 📄 License

This project is part of the Kardiverse Museum of Memory platform.

---

**Happy coding! 🎉** 