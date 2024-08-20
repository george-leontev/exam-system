from rest_framework.generics import ListAPIView

from ..serializers.test_item_type_model_serializer import TestItemTypeModelSerializer
from ..models.test_item_type_data_model import TestItemTypeDataModel


class TestItemTypeAPIView(ListAPIView):
    queryset = TestItemTypeDataModel.objects.all()
    serializer_class = TestItemTypeModelSerializer

