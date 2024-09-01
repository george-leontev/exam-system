from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from django.db import DatabaseError, transaction

from rest_framework import status

from ..serializers.test_item_data_model_serializer import TestItemDataModelSerializer
from ..models.test_item_option_data_model import TestItemOptionDataModel
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
                {"detail": "Testitem not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = TestItemDataModelSerializer(test_item)
        serialized_data = serializer.data

        test_item.delete()

        return Response(serialized_data, status=status.HTTP_200_OK)

    def post(self, request: Request):
        serializer = TestItemDataModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        with transaction.atomic():
            test_item = serializer.save()

            if request.query_params.get("with_options") is not None:
                for i in range(3):
                    test_item_option = TestItemOptionDataModel(
                        content=f"Test Item {i + 1}", test_item=test_item
                    )
                    test_item_option.save()

        return Response(serializer.data)
