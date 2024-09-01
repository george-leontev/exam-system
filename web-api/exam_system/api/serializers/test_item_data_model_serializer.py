from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from ..models.test_item_data_model import TestItemDataModel


class TestItemDataModelSerializer(ModelSerializer):
    test_id = serializers.IntegerField()
    type_id = serializers.IntegerField()

    class Meta:
        model = TestItemDataModel
        fields = ["id", "question", "date", "type_id", "test_id"]

    def create(self, validated_data):
        return TestItemDataModel.objects.create(**validated_data)
