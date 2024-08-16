from rest_framework.serializers import ModelSerializer

from ..models.test_item_data_model import TestItemDataModel


class TestItemDataModelSerializer(ModelSerializer):
    class Meta:
        model = TestItemDataModel
        fields = ['id', 'question', 'type_id', 'test_id']
