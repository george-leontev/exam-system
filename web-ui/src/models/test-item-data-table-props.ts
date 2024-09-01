import { TestItemModel } from "./test-item-model";
import { TestModel } from "./test-model";

export type TestItemDataTableProps = {
    datasource?: TestItemModel[];
    activeTest?: TestModel;
}