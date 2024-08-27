import { DataTable, DataTableRowEditCompleteEvent } from "primereact/datatable";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { PiTextboxBold as TextTypeIcon } from "react-icons/pi";
import { RiCheckboxMultipleLine as MultipleTypeIcon } from "react-icons/ri";
import { BsUiRadios as SingleTypeIcon } from "react-icons/bs";

import { useAppDataContext } from "../../contexts/app-data-context";
import { useCallback } from "react";
import { TestItemOptionModel } from "../../models/test-item-option-model";
import { DataTableRowCommandBar } from "./data-table-row-command-bar";
import { TestItemOptionsDataTableProps } from "../../models/test-item-options-data-table-props";
import { getNearestParentByNodeName } from "../../utils/dom";


export const TestItemOptionsDataTable = ({ datasource, parentData, rowEditCallback, rowAddCallback, rowDeleteCallback }: TestItemOptionsDataTableProps) => {
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
                            <Button icon="pi pi-plus" onClick={async (e) => {
                                const updatedTestItemOption = await postTestItemOptionAsync({
                                    id: 0,
                                    content: '',
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
                                        (rowElement.querySelector('.p-inputtext') as HTMLElement).focus();
                                    }, 100)

                                    const commandWrapper = rowElement.querySelector(`[data-command-bar="${updatedTestItemOption!.id}"]`);
                                    if (commandWrapper) {
                                        const commands = [
                                            { command: "cancel", display: "initial" },
                                            { command: "save", display: "initial" },
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
                    }} />
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