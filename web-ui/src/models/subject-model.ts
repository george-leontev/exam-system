import { TestModel } from "./test-model"

export type SubjectModel = {
    id: number;
    name: string;
    tests?: TestModel[];
}