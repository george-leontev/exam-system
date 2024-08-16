from django.db import models

from .test_item_data_model import TestItemDataModel
from .test_item_option_data_model import TestItemOptionDataModel


class TestItemAnswerDataModel(models.Model):
    id = models.AutoField(primary_key=True)

    test_item = models.ForeignKey(to=TestItemDataModel, on_delete=models.CASCADE)
    test_item_option = models.ForeignKey(
        to=TestItemOptionDataModel, on_delete=models.CASCADE
    )

    class Meta:
        db_table = "test_item_answer"
        verbose_name = 'Test item answer'
        verbose_name_plural = 'Test item answers' 
