import './test-item-data-table.scss'

import { DataTable, DataTableRowEditCompleteEvent, DataTableSelectionSingleChangeEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { TestItemModel } from '../../models/test-item-model';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TestItemDataTableProps } from '../../models/test-item-data-table-props';
import { useAppDataContext } from '../../contexts/app-data-context';
import { TestItemTypeDataModel } from '../../models/test-item-type-data-model';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { TestItemRowCommandBar } from './test-item-row-command-bar';


export const TestItemDataTable = ({ datasource }: TestItemDataTableProps) => {
    const [selectedItem, setSelectedItem] = useState<TestItemModel>();
    const [testItemTypes, setTestItemTypes] = useState<TestItemTypeDataModel[]>();
    const [testItems, setTestItems] = useState<TestItemModel[]>([]);
    const { getTestItemTypesAsync, putTestItemAsync } = useAppDataContext();
    const dataTableRef = useRef(null);

    useEffect(() => {
        if (datasource) {
            setTestItems(datasource);
        }
        (async () => {
            const testItemTypes = await getTestItemTypesAsync();
            if (testItemTypes) {
                setTestItemTypes(testItemTypes);
            }
        })();
    }, [datasource, getTestItemTypesAsync]);

    const onRowEditComplete = useCallback(async (e: DataTableRowEditCompleteEvent) => {
        const { newData, index } = e;
        const updatingTestItem: TestItemModel = newData as TestItemModel;
        const updatedTestItem = await putTestItemAsync(updatingTestItem);

        if (updatedTestItem) {
            setTestItems((prev) => {
                prev[index] = newData as TestItemModel;
                return [...prev];
            });
        }
    }, [putTestItemAsync]);



    return (
        <div className="datatable-container">

            <DataTable
                ref={dataTableRef}
                value={testItems}
                dataKey='id'
                editMode="row"
                onRowEditComplete={onRowEditComplete}
                selection={selectedItem}
                selectionMode={'single'}
                scrollable
                scrollHeight='100vh'
                showGridlines
                style={{ width: '100%' }}
                tableStyle={{ minWidth: '100vh' }}
                onSelectionChange={(e: DataTableSelectionSingleChangeEvent<TestItemModel[]>) => {
                    setSelectedItem(e.value);
                }}>
                <Column field="id" header="Id" />
                <Column
                    field="question"
                    header="Question"
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
                    field="typeId"
                    header="Type"
                    body={(data) => {
                        return (
                            <>{testItemTypes!.find(t => t.id === (data as TestItemModel).typeId)!.name}</>
                        );
                    }}
                    editor={(options: ColumnEditorOptions) => {
                        return (
                            <Dropdown
                                optionLabel='name'
                                optionValue='id'
                                style={{ minWidth: '100% ' }}
                                options={testItemTypes}
                                value={options.value}
                                onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
                            />
                        );
                    }} />
                <Column field='date' header='Date' body={(data: TestItemModel) => {
                    return (
                        <>
                            {(new Date(data.date)).toLocaleString('ru-RU')}
                        </>
                    );
                }} />
                <Column
                    rowEditor
                    style={{ display: 'none' }}
                />
                <Column
                    rowEditor
                    headerStyle={{ width: '10%', minWidth: '8rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                    body={(data, opt) => {
                        return (
                            <TestItemRowCommandBar options={opt} data={data as TestItemModel} deleteCallback={() => {
                                setTestItems((prev) => {
                                    return prev.filter((t) => {
                                        return (t.id !== data.id);
                                    })
                                });
                            }} />
                        );
                    }}
                />

            </DataTable>
        </div>
    );
}