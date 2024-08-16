import { TreeEventNodeEvent } from "primereact/tree";
import { SubjectModel } from "./subject-model";

export type TestTreeProps = {
    datasource?: SubjectModel[];
    onSelect: (event: TreeEventNodeEvent) => void;
};
