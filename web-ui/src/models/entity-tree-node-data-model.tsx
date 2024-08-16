import { SubjectModel } from "./subject-model";
import { TestModel } from "./test-model";

export type EntityTreeNodeDataModel = {
    entity: TestModel | SubjectModel;
    entityTypeName: "SubjectModel" | "TestModel";
};
