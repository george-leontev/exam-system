import { ColumnBodyOptions } from "primereact/column";
import { TestItemModel } from "./test-item-model";

export type TestItemRowCommandBarProps = {
    options: ColumnBodyOptions;
    data: TestItemModel;
    deleteCallback?: () => void;
    editCallback?: () => void;
}