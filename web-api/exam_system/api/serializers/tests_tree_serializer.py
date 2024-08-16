from rest_framework import serializers

from .test_data_model_serializer import TestDataModelSerializer
from ..models.subject_data_model import SubjectDataModel


class TestsTreeSerializer(serializers.ModelSerializer):
    tests = TestDataModelSerializer(many=True, read_only=True)

    class Meta:
        model = SubjectDataModel
        fields = ["id", "name", "tests"]
