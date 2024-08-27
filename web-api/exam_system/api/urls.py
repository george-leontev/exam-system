from django.urls import path

from .views.test_item_option_list_api_view import TestItemOptionAPIView
from .views.test_item_type_api_view import TestItemTypeAPIView
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
        "subjects/",
        SubjectListAPIView.as_view(),
        name="subjects-api-view",
    ),
    path(
        "tests/",
        TestCreateAPIView.as_view(),
        name="tests-create-api-view",
    ),
    path(
        "test-items/",
        TestItemListAPIView.as_view(),
        name="test-items-api-view",
    ),
    path(
        "test-item-types/",
        TestItemTypeAPIView.as_view(),
        name="test-item-api-view",
    ),
    path(
        "test-item-options/",
        TestItemOptionAPIView.as_view(),
        name="test-item-option-api-view",
    ),
]
