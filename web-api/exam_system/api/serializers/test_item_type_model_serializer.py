from rest_framework.serializers import ModelSerializer

from ..models.test_item_type_data_model import TestItemTypeDataModel


class TestItemTypeModelSerializer(ModelSerializer):
    class Meta:
        model = TestItemTypeDataModel
        fields = ["id", "name"]
