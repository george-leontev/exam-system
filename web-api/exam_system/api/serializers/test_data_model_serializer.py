from rest_framework import serializers

from ..models.subject_data_model import SubjectDataModel
from ..models.test_data_model import TestDataModel


class TestDataModelSerializer(serializers.ModelSerializer):
    subject_id = serializers.IntegerField()

    class Meta:
        model = TestDataModel
        fields = ["id", "name", "subject_id"]

    def create(self, validated_data):
        return TestDataModel.objects.create(**validated_data)
