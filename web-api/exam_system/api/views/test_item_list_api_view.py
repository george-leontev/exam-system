from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend

from ..serializers.test_item_data_model_serializer import TestItemDataModelSerializer
from ..models.test_item_data_model import TestItemDataModel


class TestItemListAPIView(ListAPIView):
    queryset = TestItemDataModel.objects.all()
    serializer_class = TestItemDataModelSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['test_id']