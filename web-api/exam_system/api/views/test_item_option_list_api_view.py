from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status


from ..models.test_item_option_data_model import TestItemOptionDataModel
from ..serializers.test_Item_option_data_model_serializer import (
    TestItemOptionDataModelSerializer,
)


class TestItemOptionAPIView(ListAPIView):
    queryset = TestItemOptionDataModel.objects.all()
    serializer_class = TestItemOptionDataModelSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["test_item_id"]

    def put(self, request: Request):
        test_item_option_id = request.data.get("id")

        if not test_item_option_id:
            return Response(
                {"detail": "test_item_option_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            test_option_item = TestItemOptionDataModel.objects.get(
                id=test_item_option_id
            )
        except TestItemOptionDataModel.DoesNotExist:
            return Response(
                {"detail": "Test item not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = TestItemOptionDataModelSerializer(
            test_option_item, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def delete(self, request: Request):
        test_item_option_id = request.query_params.get("test_item_option_id")

        if not test_item_option_id:
            return Response(
                {"detail": "test_item_option_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            test_item_option = TestItemOptionDataModel.objects.get(
                id=test_item_option_id
            )
        except TestItemOptionDataModel.DoesNotExist:
            return Response(
                {"detail": "Test item option not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = TestItemOptionDataModelSerializer(test_item_option)
        serialized_data = serializer.data

        test_item_option.delete()

        return Response(serialized_data, status=status.HTTP_200_OK)

    def post(self, request: Request):
        serializer = TestItemOptionDataModelSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except  Exception as ex:

            return Response(
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer.save()

        return Response(serializer.data)
