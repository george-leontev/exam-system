from rest_framework.generics import CreateAPIView

from ..serializers.test_data_model_serializer import TestDataModelSerializer

from ..models.test_data_model import TestDataModel


class TestCreateAPIView(CreateAPIView):
    queryset = TestDataModel.objects.all()
    serializer_class = TestDataModelSerializer
