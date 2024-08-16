from django.db import models

from .subject_data_model import SubjectDataModel


class TestDataModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)

    subject = models.ForeignKey(
        to=SubjectDataModel, on_delete=models.CASCADE, related_name="tests"
    )

    def __str__(self) -> str:
        return self.name

    class Meta:
        db_table = "test"
        verbose_name = "Test"
        verbose_name_plural = "Tests"
