from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status

from rest_framework import status
from ..serializers.test_item_data_model_serializer import TestItemDataModelSerializer
from ..models.test_item_data_model import TestItemDataModel


class TestItemListAPIView(ListAPIView):
    queryset = TestItemDataModel.objects.all()
    serializer_class = TestItemDataModelSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["test_id"]

    def put(self, request: Request):
        test_item_id = request.data.get("id")

        if not test_item_id:
            return Response(
                {"detail": "test_item_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            test_item = TestItemDataModel.objects.get(id=test_item_id)
        except TestItemDataModel.DoesNotExist:
            return Response(
                {"detail": "Test item not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = TestItemDataModelSerializer(
            test_item, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request: Request):
        test_item_id = request.query_params.get("test_item_id")

        if not test_item_id:
            return Response(
                {"detail": "test_item_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            test_item = TestItemDataModel.objects.get(id=test_item_id)
        except TestItemDataModel.DoesNotExist:
            return Response(
                {"detail": "Testitem not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = TestItemDataModelSerializer(test_item)
        serialized_data = serializer.data

        test_item.delete()

        return Response(serialized_data, status=status.HTTP_200_OK)
