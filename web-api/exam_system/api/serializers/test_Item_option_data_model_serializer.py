from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from ..models.test_item_option_data_model import TestItemOptionDataModel


class TestItemOptionDataModelSerializer(ModelSerializer):
    test_item_id = serializers.IntegerField()

    class Meta:
        model = TestItemOptionDataModel
        fields = ["id", "content", "test_item_id"]

    def create(self, validated_data):
        return TestItemOptionDataModel.objects.create(**validated_data) 
