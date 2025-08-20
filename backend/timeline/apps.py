from django.apps import AppConfig


class TimelineConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'timeline'
    verbose_name = 'Timeline'
    
    def ready(self):
        """Import signals when app is ready"""
        try:
            import timeline.signals
        except ImportError:
            pass
