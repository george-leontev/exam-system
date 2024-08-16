from rest_framework.serializers import ModelSerializer

from ..models.subject_data_model import SubjectDataModel


class SubjectDataModelSerializer(ModelSerializer):
    class Meta:
        model = SubjectDataModel
        fields = ['id', 'name']
