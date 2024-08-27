import { Entity } from "./entity";
import { TestModel } from "./test-model"

export interface SubjectModel extends Entity {
    name: string;
    tests?: TestModel[];
}