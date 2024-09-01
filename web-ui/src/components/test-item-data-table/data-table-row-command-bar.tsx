import { confirmDialog } from "primereact/confirmdialog";
import { useCallback } from "react";
import { DataTableRowCommandBarProps } from "../../models/data-table-row-command-bar-props";
import { getNearestParentByNodeName } from "../../utils/dom";
import { useTestPageContext } from "../../pages/test-page/test-page-context";
import { useAppSharedContext } from "../../contexts/app-shared-context";

export const DataTableRowCommandBar = ({ data, deleteCallback, editCallback }: DataTableRowCommandBarProps) => {
    const { toast } = useAppSharedContext();
    const { possibilityOfAddingEditingTestItem, setPossibilityOfAddingEditingTestItem, possibilityOfAddingEditingTestItemOption, setPossibilityOfAddingEditingTestItemOption } = useTestPageContext();

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
                    if (!possibilityOfAddingEditingTestItem || !possibilityOfAddingEditingTestItemOption) {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Not allowed',
                            detail: 'You cannot enter edit mode while creating or modifying another item.',
                            life: 3500
                        });

                        return;
                    }

                    setPossibilityOfAddingEditingTestItem(false);

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
                            { command: "cancel", display: "inline-flex" },
                            { command: "save", display: "inline-flex" },
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

            <button
                data-command='delete'
                className="p-row-editor-init p-link"
                onClick={() => {
                    deleteHandler();
                }}>
                <i
                    className="pi pi-trash"
                ></i>
            </button>

            <button
                data-command='save'
                style={{ display: 'none', background: 'none' }}
                className="p-row-editor-init p-link"
                onClick={(e) => {
                    setPossibilityOfAddingEditingTestItem(true);
                    setPossibilityOfAddingEditingTestItemOption(true);



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
                            { command: "edit", display: "inline-flex" },
                            { command: "delete", display: "inline-flex" }
                        ];
                        commands.forEach(c => {
                            ((commandWrapper.querySelector(`[data-command="${c.command}"]`)) as HTMLElement).style.display = c.display;
                        });
                    }
                }}>
                <i
                    className="pi pi-check"
                ></i>
            </button>

            <button
                data-command='cancel'
                style={{ display: 'none' }}
                className="p-row-editor-init p-link"
                onClick={(e) => {
                    setPossibilityOfAddingEditingTestItem(true);
                    setPossibilityOfAddingEditingTestItemOption(true);

                    const table = getNearestParentByNodeName(e.currentTarget, 'TABLE');
                    if (!table) {
                        return;
                    }

                    const rowElement = table.querySelector(`td input[data-id="${data.id}"]`)?.parentElement?.parentElement;
                    if (!rowElement) {
                        return;
                    }

                    const inputFirstEditAttributeValue = (rowElement.querySelector('.p-inputtext') as HTMLInputElement).getAttribute("data-first-edit")!;
                    if (inputFirstEditAttributeValue === '') {
                        const activeInput = (rowElement.querySelector('.p-inputtext') as HTMLInputElement);

                        if (activeInput.value === 'Default value' && deleteCallback) {
                            deleteCallback();
                        }
                    }

                    (rowElement.querySelector('.p-row-editor-cancel') as HTMLElement).click();
                    const commandWrapper = rowElement.querySelector(`[data-command-bar="${data.id}"]`);
                    if (commandWrapper) {
                        const commands = [
                            { command: "cancel", display: "none" },
                            { command: "save", display: "none" },
                            { command: "edit", display: "inline-flex" },
                            { command: "delete", display: "inline-flex" }
                        ];
                        commands.forEach(c => {
                            ((commandWrapper.querySelector(`[data-command="${c.command}"]`)) as HTMLElement).style.display = c.display;
                        });
                    }
                }}>
                <i
                    className="pi pi-times"
                ></i>
            </button>
        </div>
    );
}

