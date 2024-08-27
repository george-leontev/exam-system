from django.db import models

from .test_item_data_model import TestItemDataModel


class TestItemOptionDataModel(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=64, blank=True)

    test_item = models.ForeignKey(to=TestItemDataModel, on_delete=models.CASCADE)

    class Meta:
        db_table = "test_item_option"
        verbose_name = 'Test item option'
        verbose_name_plural = 'Test item options'
