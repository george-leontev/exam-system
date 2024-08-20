import { TreeEventNodeEvent } from "primereact/tree";
import { SubjectModel } from "./subject-model";
import { RefObject } from "react";
import { Menu } from "primereact/menu";

export type TestTreeProps = {
    datasource?: SubjectModel[];
    onSelect: (event: TreeEventNodeEvent) => void;
    menuTreeRef: RefObject<Menu>
};
