from django.apps import AppConfig


class MemorialsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'memorials'
    verbose_name = 'Memorials'
    
    def ready(self):
        """Import signals when app is ready"""
        try:
            import memorials.signals
        except ImportError:
            pass
