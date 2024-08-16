from django.urls import path

from .views.test_create_api_view import TestCreateAPIView
from .views.subject_list_api_view import SubjectListAPIView
from .views.tests_tree_api_view import TestsTreeAPIView
from .views.test_item_list_api_view import TestItemListAPIView


urlpatterns = [
    path(
        "tests-tree/",
        TestsTreeAPIView.as_view(),
        name="tests-tree-api-view",
    ),
    path(
        "test-items/",
        TestItemListAPIView.as_view(),
        name="test-items-api-view",
    ),
    path(
        "subjects/",
        SubjectListAPIView.as_view(),
        name="subjects-api-view",
    ),
    path(
        "tests/",
        TestCreateAPIView.as_view(),
        name="tests-create-api-view",
    ),
]
