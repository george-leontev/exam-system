from django.db import models


class TestItemTypeDataModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "test_item_type"
        verbose_name = 'Test item type'
        verbose_name_plural = 'Test item types'
