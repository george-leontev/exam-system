import { confirmDialog } from "primereact/confirmdialog";
import { useCallback } from "react";
import { TestItemModel } from "../../models/test-item-model";
import { useAppDataContext } from "../../contexts/app-data-context";
import { TestItemRowCommandBarProps } from "../../models/test-item-row-command-bar-props";

export const TestItemRowCommandBar = ({ options, data, deleteCallback, editCallback }: TestItemRowCommandBarProps) => {
    const { deleteTestItemAsync } = useAppDataContext();

    const deleteTestItem = useCallback((testItem: TestItemModel) => {
        confirmDialog({
            message: `Do you want to delete the test item with ID ${testItem.id}?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                const deletedTestItem = await deleteTestItemAsync(testItem.id);
                if (deletedTestItem && deleteCallback) {
                    deleteCallback();
                }
            },
            reject: () => {
                return;
            }
        });
    }, [deleteCallback, deleteTestItemAsync]);

    return (
        <div data-row-index={options.rowIndex} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <i
                data-command='edit'
                className="pi pi-pencil"
                onClick={(e) => {
                    (document.querySelectorAll('.p-row-editor-init')[options.rowIndex] as HTMLElement).click();
                    (e.target as HTMLElement).style.display = 'none';
                    if (editCallback) {
                        editCallback();
                    }
                    const commandWrapper = document.querySelector(`[data-row-index="${options.rowIndex}"]`);
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
                }}></i>
            <i
                data-command='delete'
                className="pi pi-trash"
                onClick={() => {
                    deleteTestItem(data as TestItemModel);
                }}></i>
            <i
                data-command='save'
                className="pi pi-check"
                style={{ display: 'none' }}
                onClick={() => {
                    (document.querySelector('.p-row-editor-save') as HTMLElement).click();
                    const commandWrapper = document.querySelector(`[data-row-index="${options.rowIndex}"]`);
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
            <i
                data-command='cancel'
                className="pi pi-times"
                style={{ display: 'none' }}
                onClick={() => {
                    (document.querySelector('.p-row-editor-cancel') as HTMLElement).click();

                    const commandWrapper = document.querySelector(`[data-row-index="${options.rowIndex}"]`);
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
        </div>
    );
}