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
                if 'django_' in table_name or 'auth_' in table_name:
                    continue
                if connection.vendor == "postgresql":
                   cursor.execute(f"SELECT setval(pg_get_serial_sequence('{table_name}', 'id'), coalesce(max(id), 1), max(id) IS NOT null) FROM {table_name};")
                elif connection.vendor == "sqlite":
                    cursor.execute(f"UPDATE sqlite_sequence SET seq = (SELECT MAX(id) FROM {table_name}) WHERE name = '{table_name}';")
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
        multiple_type = TestItemTypeDataModel.objects.create(name="Mulpiple")
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

        rus_item_1 = TestItemDataModel.objects.create(
            question="В каком слове звуков больше, чем букв?",
            test=rus_test_1,
            type=single_type,
        )
        rus_item_2 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только твёрдые согласные звуки?",
            test=rus_test_1,
            type=multiple_type,
        )
        rus_item_3 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_4 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_5 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_6 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_7 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_8 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_9 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_10 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_1 = TestItemDataModel.objects.create(
            question="В каком слове звуков больше, чем букв?",
            test=rus_test_1,
            type=single_type,
        )
        rus_item_2 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только твёрдые согласные звуки?",
            test=rus_test_1,
            type=multiple_type,
        )
        rus_item_3 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_4 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_5 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_6 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_7 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_8 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_9 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_10 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_1 = TestItemDataModel.objects.create(
            question="В каком слове звуков больше, чем букв?",
            test=rus_test_1,
            type=single_type,
        )
        rus_item_2 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только твёрдые согласные звуки?",
            test=rus_test_1,
            type=multiple_type,
        )
        rus_item_3 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_4 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_5 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_6 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_7 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_8 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_9 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )
        rus_item_10 = TestItemDataModel.objects.create(
            question="В каком слове произносятся только мягкие согласные звуки?",
            test=rus_test_1,
            type=text_type,
        )

        option_1_item_1 = TestItemOptionDataModel.objects.create(
            content="юрта", test_item=rus_item_1
        )
        option_2_item_1 = TestItemOptionDataModel.objects.create(
            content="звёзды", test_item=rus_item_1
        )
        option_3_item_1 = TestItemOptionDataModel.objects.create(
            content="ель", test_item=rus_item_1
        )
        option_4_item_1 = TestItemOptionDataModel.objects.create(
            content="эхо", test_item=rus_item_1
        )

        option_1_item_2 = TestItemOptionDataModel.objects.create(
            content="пение", test_item=rus_item_2
        )
        option_2_item_2 = TestItemOptionDataModel.objects.create(
            content="вагон", test_item=rus_item_2
        )
        option_3_item_2 = TestItemOptionDataModel.objects.create(
            content="колесо", test_item=rus_item_2
        )
        option_4_item_2 = TestItemOptionDataModel.objects.create(
            content="прямо", test_item=rus_item_2
        )

        option_1_item_3 = TestItemOptionDataModel.objects.create(
            content="русский", test_item=rus_item_3
        )
        option_2_item_3 = TestItemOptionDataModel.objects.create(
            content="сентябрь", test_item=rus_item_3
        )
        option_3_item_3 = TestItemOptionDataModel.objects.create(
            content="яркий", test_item=rus_item_3
        )
        option_4_item_3 = TestItemOptionDataModel.objects.create(
            content="сеять", test_item=rus_item_3
        )

        TestItemAnswerDataModel.objects.create(
            test_item=rus_item_1, test_item_option=option_1_item_1
        )
        TestItemAnswerDataModel.objects.create(
            test_item=rus_item_2, test_item_option=option_2_item_2
        )
        TestItemAnswerDataModel.objects.create(
            test_item=rus_item_3, test_item_option=option_4_item_3
        )
