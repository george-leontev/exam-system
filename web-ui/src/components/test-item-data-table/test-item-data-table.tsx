import './test-item-data-table.scss'

import { DataTable, DataTableExpandedRows, DataTableRowEditCompleteEvent, DataTableSelectionSingleChangeEvent, DataTableValueArray } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { TestItemModel } from '../../models/test-item-model';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TestItemDataTableProps } from '../../models/test-item-data-table-props';
import { useAppDataContext } from '../../contexts/app-data-context';
import { TestItemTypeModel } from '../../models/test-item-type-model';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { TestItemOptionModel } from '../../models/test-item-option-model';
import { DataTableRowCommandBar } from './data-table-row-command-bar';
import { TestItemOptionsDataTable } from './test-item-options-data-table';


export const TestItemDataTable = ({ datasource }: TestItemDataTableProps) => {
    const [selectedItem, setSelectedItem] = useState<TestItemModel>();
    const [testItemTypes, setTestItemTypes] = useState<TestItemTypeModel[]>();
    const [testItemOptions, setTestItemOptions] = useState<TestItemOptionModel[]>([]);
    const [testItems, setTestItems] = useState<TestItemModel[]>([]);
    const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>();
    const dataTableRef = useRef(null);

    const { getTestItemTypesAsync, putTestItemAsync, deleteTestItemAsync, getTestItemOptionsAsync } = useAppDataContext();

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

    const onRowEditTestItemComplete = useCallback(async (e: DataTableRowEditCompleteEvent) => {
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

    const rowExpansionTemplate = (data: TestItemModel) => {
        return (
            <TestItemOptionsDataTable datasource={testItemOptions}
                parentData={data}
                rowAddCallback={(newData: TestItemOptionModel) => {
                    setTestItemOptions((prev) => {
                        return [newData, ...prev];
                    })
                }}
                rowEditCallback={(newData: TestItemOptionModel) => {
                    setTestItemOptions((prev) => {
                        const index = prev.findIndex(i => i.id === newData.id);
                        prev[index] = newData as TestItemOptionModel;
                        return [...prev];
                    });
                }}
                rowDeleteCallback={(newData: TestItemOptionModel) => {
                    setTestItemOptions((prev) => {
                        return prev.filter((t) => {
                            return (t.id !== newData.id);
                        });
                    });
                }}
            />
        );
    };

    return (
        <div className="datatable-container">
            <DataTable
                ref={dataTableRef}
                value={testItems}
                dataKey='id'
                rowExpansionTemplate={rowExpansionTemplate}
                expandedRows={expandedRows}
                editMode="row"
                onRowEditComplete={onRowEditTestItemComplete}
                selection={selectedItem}
                selectionMode={'single'}
                scrollable
                scrollHeight='100vh'
                showGridlines
                style={{ width: '100%' }}
                tableStyle={{ minWidth: '100vh' }}
                onRowExpand={async (e) => {
                    const testItemOptions = await getTestItemOptionsAsync(e.data.id);
                    if (testItemOptions) {
                        setTestItemOptions(testItemOptions);
                    }
                }}
                onRowToggle={(e) => {
                    const prevExpandedRowKeys = expandedRows ? Object.keys(expandedRows as object) : [];
                    let newExpandedRows = { ...e.data };
                    Object.keys(e.data).forEach((k) => {
                        if (prevExpandedRowKeys.includes(k)) {
                            newExpandedRows = Object.fromEntries(Object.entries(newExpandedRows).filter(([key]) => key !== k));
                        }
                    });

                    setExpandedRows(newExpandedRows);
                }}
                onSelectionChange={(e: DataTableSelectionSingleChangeEvent<TestItemModel[]>) => {
                    setSelectedItem(e.value);
                }}>
                <Column style={{ display: 'none' }} body={(data) => {
                    return (
                        <input data-id={data.id} type='hidden' />
                    );
                }} />
                <Column
                    rowEditor
                    style={{ display: 'none' }}
                />
                <Column expander />
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
                    headerStyle={{ width: '10%', minWidth: '8rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                    body={(data) => {
                        return (
                            <DataTableRowCommandBar data={data as TestItemModel} deleteCallback={async () => {
                                const deletedTestItem = await deleteTestItemAsync((data as TestItemModel).id);
                                if (deletedTestItem) {
                                    setTestItems((prev) => {
                                        return prev.filter((t) => {
                                            return (t.id !== data.id);
                                        });
                                    });
                                }
                            }} />
                        );
                    }}
                />

            </DataTable>
        </div>
    );
}