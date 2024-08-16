from django.db import models

from .test_item_type_data_model import TestItemTypeDataModel
from .test_data_model import TestDataModel


class TestItemDataModel(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=128)

    type = models.ForeignKey(to=TestItemTypeDataModel, on_delete=models.CASCADE)
    test = models.ForeignKey(to=TestDataModel, on_delete=models.CASCADE)

    class Meta:
        db_table = 'test_item'
        verbose_name = 'Test item'
        verbose_name_plural = 'Test items'
