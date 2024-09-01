import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { MdOutlineTextSnippet as TextTypeIcon } from "react-icons/md";
import { IoMdCheckboxOutline as MultipleTypeIcon } from "react-icons/io";
import { IoMdRadioButtonOff as SingleTypeIcon } from "react-icons/io";

import { useAppDataContext } from "../../contexts/app-data-context";
import { useCallback } from "react";
import { TestItemOptionModel } from "../../models/test-item-option-model";
import { DataTableRowCommandBar } from "./data-table-row-command-bar";
import { TestItemOptionsDataTableProps } from "../../models/test-item-options-data-table-props";
import { getNearestParentByNodeName } from "../../utils/dom";
import { useTestPageContext } from "../../pages/test-page/test-page-context";
import { useAppSharedContext } from "../../contexts/app-shared-context";


export const TestItemOptionsDataTable = ({ datasource, parentData, rowEditCallback, rowAddCallback, rowDeleteCallback }: TestItemOptionsDataTableProps) => {
    const { toast } = useAppSharedContext();
    const { possibilityOfAddingEditingTestItemOption, setPossibilityOfAddingEditingTestItemOption, possibilityOfAddingEditingTestItem } = useTestPageContext();
    const { putTestItemOptionsAsync, deleteTestItemOptionsAsync, postTestItemOptionAsync } = useAppDataContext();

    const onRowEditCompleteHandler = useCallback(async (e: DataTableRowEditCompleteEvent) => {
        const { newData } = e;
        const updatingTestItemOption: TestItemOptionModel = newData as TestItemOptionModel;
        const updatedTestItemOption = await putTestItemOptionsAsync(updatingTestItemOption);

        if (updatedTestItemOption && rowEditCallback) {
            rowEditCallback(updatedTestItemOption);
        }
    }, [putTestItemOptionsAsync, rowEditCallback]);

    const renderIcon = useCallback((typeId: number) => {
        if (typeId === 1) {
            return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><SingleTypeIcon /></div>
        } else if (typeId === 2) {
            return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><MultipleTypeIcon /></div>
        } else return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><TextTypeIcon /></div>
    }, []);

    return (
        <div style={{ width: '40%', marginLeft: '50px' }}>
            <DataTable
                value={datasource}
                dataKey='id'
                sortField="id"
                sortOrder={-1}
                editMode="row"
                onRowEditComplete={onRowEditCompleteHandler}
            >
                <Column style={{ display: 'none' }} body={(data) => {
                    return (
                        <input data-id={data.id} type='hidden' />
                    );
                }} />
                <Column
                    rowEditor
                    style={{ display: 'none' }}
                />
                <Column
                    style={{ width: '14px' }}
                    body={renderIcon(parentData.typeId)}
                    header={() => {
                        return (
                            <Button icon="pi pi-plus" className="default-button-icon" onClick={async (e) => {

                                if (!possibilityOfAddingEditingTestItemOption || !possibilityOfAddingEditingTestItem) {
                                    toast.current?.show({
                                        severity: 'error',
                                        summary: 'Not allowed',
                                        detail: 'You cannot add an item while you are creating or editing another item.',
                                        life: 3500
                                    });

                                    return;
                                }

                                setPossibilityOfAddingEditingTestItemOption(false);

                                const updatedTestItemOption = await postTestItemOptionAsync({
                                    id: 0,
                                    content: 'Default value',
                                    testItemId: parentData.id
                                });
                                if (updatedTestItemOption && rowAddCallback) {
                                    rowAddCallback(updatedTestItemOption);
                                }

                                setTimeout(() => {
                                    const table = getNearestParentByNodeName(e.target as HTMLElement, 'TABLE');
                                    if (!table) {
                                        return;
                                    }
                                    // TODO: here may be empty array or undefined!
                                    const rowElement = table.querySelector(`td input[data-id="${updatedTestItemOption!.id}"]`)?.parentElement?.parentElement;
                                    if (!rowElement) {
                                        return;
                                    }

                                    (rowElement.querySelector(`[data-p-row-editor-init].p-row-editor-init`) as HTMLElement).click();
                                    setTimeout(() => {
                                        const inputTextElement = rowElement.querySelector('.p-inputtext') as HTMLInputElement;
                                        inputTextElement.focus();
                                        inputTextElement.select();
                                        inputTextElement.setAttribute("data-first-edit", "");
                                    }, 100)

                                    const commandWrapper = rowElement.querySelector(`[data-command-bar="${updatedTestItemOption!.id}"]`);
                                    if (commandWrapper) {
                                        const commands = [
                                            { command: "cancel", display: "inline-flex" },
                                            { command: "save", display: "inline-flex" },
                                            { command: "delete", display: "none" },
                                            { command: "edit", display: "none" }
                                        ];
                                        commands.forEach(c => {
                                            ((commandWrapper.querySelector(`[data-command="${c.command}"]`)) as HTMLElement).style.display = c.display;
                                        });
                                    }
                                }, 100);
                            }} />
                        );
                    }

                    } />
                <Column
                    field='content'
                    header='Options'
                    editor={(options: ColumnEditorOptions) => {
                        return (
                            <InputText
                                type="text"
                                style={{ minWidth: '100%' }}
                                value={options.value}
                                onChange={(e) => options.editorCallback!(e.target.value)} />
                        );
                    }} />

                <Column
                    rowEditor
                    headerStyle={{ width: '10%', minWidth: '8rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                    body={(data) => {
                        return (
                            <DataTableRowCommandBar data={data as TestItemOptionModel} deleteCallback={async () => {
                                const deletedTestItemOption = await deleteTestItemOptionsAsync((data as TestItemOptionModel).id);

                                if (deletedTestItemOption && rowDeleteCallback) {
                                    rowDeleteCallback(deletedTestItemOption);
                                }
                            }} />
                        );
                    }}
                />
            </DataTable>
        </div>
    );
}