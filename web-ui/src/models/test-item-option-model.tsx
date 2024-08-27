import { Entity } from "./entity";

export interface TestItemOptionModel extends Entity {
    content: string;
    testItemId: number;
}