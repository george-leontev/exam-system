import { TestItemModel } from "./test-item-model";
import { TestItemOptionModel } from "./test-item-option-model";

export type TestItemOptionsDataTableProps = {
    datasource: TestItemOptionModel[];
    parentData: TestItemModel;
    rowAddCallback?: (newData: TestItemOptionModel) => void;
    rowEditCallback?: (newData: TestItemOptionModel) => void;
    rowDeleteCallback?: (newData: TestItemOptionModel) => void;
}