import { Entity } from "./entity";

export type DataTableRowCommandBarProps = {
    data: Entity;
    deleteCallback?: () => void;
    editCallback?: () => void;
}