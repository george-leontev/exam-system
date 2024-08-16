import { TestDialogModes } from './enums/test-dialog-modes';
import { TestModel } from "./test-model";

export type TestDialogProps = {
    onHide: (updatedTest?: TestModel) => Promise<void> | void;
    editedTest?: TestModel;
    mode: TestDialogModes | undefined;
}