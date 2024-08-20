from datetime import datetime
import random
from django.apps import apps
from django.core.management.base import BaseCommand
from django.db import connection

from ...models.subject_data_model import SubjectDataModel
from ...models.test_data_model import TestDataModel
from ...models.test_item_data_model import TestItemDataModel
from ...models.test_item_type_data_model import TestItemTypeDataModel
from ...models.test_item_answer_data_model import TestItemAnswerDataModel
from ...models.test_item_option_data_model import TestItemOptionDataModel


class Command(BaseCommand):
    def handle(self, *args, **options) -> str | None:
        SubjectDataModel.objects.all().delete()
        TestItemTypeDataModel.objects.all().delete()

        with connection.cursor() as cursor:
            for model in apps.get_models():
                table_name = model._meta.db_table
                if "django_" in table_name or "auth_" in table_name:
                    continue
                if connection.vendor == "postgresql":
                    cursor.execute(
                        f"SELECT setval(pg_get_serial_sequence('{table_name}', 'id'), coalesce(max(id), 1), max(id) IS NOT null) FROM {table_name};"
                    )
                elif connection.vendor == "sqlite":
                    cursor.execute(
                        f"UPDATE sqlite_sequence SET seq = (SELECT MAX(id) FROM {table_name}) WHERE name = '{table_name}';"
                    )
                elif connection.vendor == "mysql":
                    cursor.execute(f"ALTER TABLE {table_name} AUTO_INCREMENT = 1;")
                else:
                    self.stdout.write(self.style.ERROR("Unsupported database backend"))

        russian = SubjectDataModel.objects.create(name="Russian language")
        maths = SubjectDataModel.objects.create(name="Maths")
        programming_languages = SubjectDataModel.objects.create(
            name="Programming languages"
        )

        single_type = TestItemTypeDataModel.objects.create(name="Single")
        multiple_type = TestItemTypeDataModel.objects.create(name="Multiple")
        text_type = TestItemTypeDataModel.objects.create(name="Text")

        maths_test_1 = TestDataModel.objects.create(
            name="Test 1 (grade 4)", subject=maths
        )
        maths_test_2 = TestDataModel.objects.create(
            name="Test 2 (grade 4)", subject=maths
        )
        maths_test_3 = TestDataModel.objects.create(
            name="Test 3 (grade 4)", subject=maths
        )

        rus_test_1 = TestDataModel.objects.create(
            name="Test 1 (grade 4)", subject=russian
        )
        rus_test_2 = TestDataModel.objects.create(
            name="Test 2 (grade 4)", subject=russian
        )
        rus_test_3 = TestDataModel.objects.create(
            name="Test 3 (grade 4)", subject=russian
        )
        rus_test_4 = TestDataModel.objects.create(
            name="Test 4 (grade 4)", subject=russian
        )

        for i in range(1, 200):
            TestItemDataModel.objects.create(
                question="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                test=random.choice([rus_test_1, rus_test_2, rus_test_3, rus_test_4, maths_test_1, maths_test_2, maths_test_3]),
                type=random.choice([text_type, single_type, multiple_type]),
                date=datetime.now(),
            )
