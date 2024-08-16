import './test-item-data-table.scss'

import { DataTable, DataTableSelectionSingleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TestItemModel } from '../../models/test-item-model';
import { useState } from 'react';
import { TestItemDataTableProps } from '../../models/test-item-data-table-props';


export const TestItemDataTable = ({ datasource }: TestItemDataTableProps) => {
    const [selectedItem, setSelectedItem] = useState<TestItemModel>();

    return (
        <div className="datatable-container">
            <DataTable
                value={datasource}
                dataKey='id'
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
                <Column field="id" header="Id"></Column>
                <Column field="question" header="Question"></Column>
            </DataTable>
        </div>
    );
}