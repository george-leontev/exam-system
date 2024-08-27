import { confirmDialog } from "primereact/confirmdialog";
import { useCallback } from "react";
import { DataTableRowCommandBarProps } from "../../models/data-table-row-command-bar-props";
import { getNearestParentByNodeName } from "../../utils/dom";

 export const DataTableRowCommandBar = ({  data,  deleteCallback, editCallback }: DataTableRowCommandBarProps) => {

    const deleteHandler = useCallback(() => {
        confirmDialog({
            message: `Do you want to delete the item?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                if (deleteCallback) {
                    deleteCallback();
                }
            },
            reject: () => {
                return;
            }
        });
    }, [deleteCallback]);

    return (
        <div data-command-bar={data.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <button data-command='edit' className="p-row-editor-init p-link"
                onClick={(e) => {
                    const table = getNearestParentByNodeName(e.currentTarget, 'TABLE');
                    if (!table) {
                        return;
                    }
                    // TODO: here may be empty array or undefined!
                    const rowElement = table.querySelector(`td input[data-id="${data.id}"]`)?.parentElement?.parentElement;
                    if (!rowElement) {
                        return;
                    }

                    (rowElement.querySelector(`[data-p-row-editor-init].p-row-editor-init`) as HTMLElement).click();
                    (e.currentTarget as HTMLElement).style.display = 'none';
                    if (editCallback) {
                        editCallback();
                    }
                    const commandWrapper = rowElement.querySelector(`[data-command-bar="${data.id}"]`);
                    if (commandWrapper) {
                        const commands = [
                            { command: "cancel", display: "initial" },
                            { command: "save", display: "initial" },
                            { command: "delete", display: "none" }
                        ];
                        commands.forEach(c => {
                            ((commandWrapper.querySelector(`[data-command="${c.command}"]`)) as HTMLElement).style.display = c.display;
                        });
                    }
                }}>
                <i
                    className="pi pi-pencil"
                ></i>
            </button>

            <button data-command='delete' className="p-row-editor-init p-link">
                <i
                    className="pi pi-trash"
                    onClick={() => {
                        deleteHandler();
                    }}></i>
            </button>

            <button data-command='save' style={{ display: 'none', background: 'none' }} className="p-row-editor-init p-link">
                <i
                    className="pi pi-check "
                    onClick={(e) => {
                        const table = getNearestParentByNodeName(e.currentTarget, 'TABLE');
                        if (!table) {
                            return;
                        }

                        const rowElement = table.querySelector(`td input[data-id="${data.id}"]`)?.parentElement?.parentElement;
                        if (!rowElement) {
                            return;
                        }

                        (rowElement.querySelector('.p-row-editor-save') as HTMLElement).click();
                        const commandWrapper = rowElement.querySelector(`[data-command-bar="${data.id}"]`);
                        if (commandWrapper) {
                            const commands = [
                                { command: "cancel", display: "none" },
                                { command: "save", display: "none" },
                                { command: "edit", display: "initial" },
                                { command: "delete", display: "initial" }
                            ];
                            commands.forEach(c => {
                                ((commandWrapper.querySelector(`[data-command="${c.command}"]`)) as HTMLElement).style.display = c.display;
                            });
                        }
                    }}></i>
            </button>

            <button data-command='cancel' style={{ display: 'none' }} className="p-row-editor-init p-link">
                <i
                    className="pi pi-times"
                    onClick={(e) => {
                        const table = getNearestParentByNodeName(e.currentTarget, 'TABLE');
                        if (!table) {
                            return;
                        }

                        const rowElement = table.querySelector(`td input[data-id="${data.id}"]`)?.parentElement?.parentElement;
                        if (!rowElement) {
                            return;
                        }

                        (rowElement.querySelector('.p-row-editor-cancel') as HTMLElement).click();
                        const commandWrapper = rowElement.querySelector(`[data-command-bar="${data.id}"]`);
                        if (commandWrapper) {
                            const commands = [
                                { command: "cancel", display: "none" },
                                { command: "save", display: "none" },
                                { command: "edit", display: "initial" },
                                { command: "delete", display: "initial" }
                            ];
                            commands.forEach(c => {
                                ((commandWrapper.querySelector(`[data-command="${c.command}"]`)) as HTMLElement).style.display = c.display;
                            });
                        }
                    }}></i>
            </button>
        </div>
    );
}

