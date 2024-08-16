from rest_framework.generics import ListAPIView

from ..serializers.subject_data_model_serializer import SubjectDataModelSerializer
from ..models.subject_data_model import SubjectDataModel


class SubjectListAPIView(ListAPIView):
    queryset = SubjectDataModel.objects.all()
    serializer_class = SubjectDataModelSerializer
