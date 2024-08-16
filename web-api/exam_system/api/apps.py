from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.AutoField"
    name = "api"

    def ready(self) -> None:
        from . import models

        return super().ready()
