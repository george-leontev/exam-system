from django.db import models
from django.contrib.auth.models import User

from .test_item_data_model import TestItemDataModel


class UserResultDataModel(models.Model):
    id = models.AutoField(primary_key=True)
    result = models.BooleanField(default=False)

    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    test_item = models.ForeignKey(to=TestItemDataModel, on_delete=models.CASCADE)

    class Meta:
        db_table = "user_result"
        verbose_name = "User result"
        verbose_name_plural = "User results"
