from django.contrib import admin

from .models.subject_data_model import SubjectDataModel
from .models.test_data_model import TestDataModel
from .models.test_item_data_model import TestItemDataModel
from .models.test_item_option_data_model import TestItemOptionDataModel
from .models.test_item_type_data_model import TestItemTypeDataModel
from .models.test_item_answer_data_model import TestItemAnswerDataModel
from .models.user_result_data_model import UserResultDataModel


class SubjectAdminModel(admin.ModelAdmin):
    pass


class TestAdminModel(admin.ModelAdmin):
    pass


class TestItemAdminModel(admin.ModelAdmin):
    pass


class TestItemTypesAdminModel(admin.ModelAdmin):
    pass


class TestItemOptionAdminModel(admin.ModelAdmin):
    pass


class TestItemAnswerAdminModel(admin.ModelAdmin):
    pass


class UserResultAdminModel(admin.ModelAdmin):
    pass


admin.site.register(SubjectDataModel, SubjectAdminModel)
admin.site.register(TestDataModel, TestAdminModel)
admin.site.register(TestItemDataModel, TestItemAdminModel)
admin.site.register(TestItemTypeDataModel, TestItemTypesAdminModel)
admin.site.register(TestItemOptionDataModel, TestItemOptionAdminModel)
admin.site.register(TestItemAnswerDataModel, TestItemAnswerAdminModel)
admin.site.register(UserResultDataModel, UserResultAdminModel)
