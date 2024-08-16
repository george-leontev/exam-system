from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status


from ..serializers.test_data_model_serializer import TestDataModelSerializer
from ..serializers.tests_tree_serializer import TestsTreeSerializer
from ..models.test_data_model import TestDataModel
from ..models.subject_data_model import SubjectDataModel


class TestsTreeAPIView(APIView):
    def get(self, request: Request):
        subjects = SubjectDataModel.objects.prefetch_related("tests").all()
        serializer = TestsTreeSerializer(subjects, many=True)

        return Response(data=serializer.data)

    def post(self, request: Request):
        serializer = TestDataModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request: Request):
        test_id = request.query_params.get("test_id")

        if not test_id:
            return Response(
                {"detail": "test_id is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            test = TestDataModel.objects.get(id=test_id)
        except TestDataModel.DoesNotExist:
            return Response(
                {"detail": "Test not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = TestDataModelSerializer(test)
        serialized_data = serializer.data

        test.delete()

        return Response(serialized_data, status=status.HTTP_200_OK)

    def put(self, request: Request):
        test_id = request.data.get("id")

        if not test_id:
            return Response(
                {"detail": "test_id is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            test = TestDataModel.objects.get(id=test_id)
        except TestDataModel.DoesNotExist:
            return Response(
                {"detail": "Test not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = TestDataModelSerializer(test, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
