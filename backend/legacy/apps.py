from django.apps import AppConfig


class LegacyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'legacy'
    verbose_name = 'Legacy'
    
    def ready(self):
        """Import signals when app is ready"""
        try:
            import legacy.signals
        except ImportError:
            pass
