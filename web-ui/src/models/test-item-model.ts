import { Entity } from "./entity";

export interface TestItemModel extends Entity {
    question: string;
    date: Date;
    typeId: number;
    testId: number;
}