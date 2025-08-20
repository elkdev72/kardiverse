from django.apps import AppConfig


class WakeroomConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'wakeroom'
    verbose_name = 'WakeRoom'
    
    def ready(self):
        """Import signals when app is ready"""
        try:
            import wakeroom.signals
        except ImportError:
            pass
