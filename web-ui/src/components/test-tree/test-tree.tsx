import { useCallback, useState } from 'react';

import { TreeTable, TreeTableSelectionEvent, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { TestTreeProps } from '../../models/test-tree-props';
import { SubjectModel } from '../../models/subject-model';
import { TestModel } from '../../models/test-model';

import './test-tree.scss';
import { TreeTableHeaderMenuButton } from './tree-table-header-menu-button';


export const TestTree = ({ datasource, onSelect }: TestTreeProps) => {
    const [selectedKeys, setSelectedKeys] = useState<string | TreeTableSelectionKeysType>();

    const buildTreeNodes = useCallback((subjects?: SubjectModel[]) => {
        if (!subjects) {
            return [];
        }

        const treeNodes = subjects.map((s) => {
            return {
                key: `subject_${s.id}`,
                label: s.name,
                data: { entity: s, entityTypeName: "SubjectModel" },
                children: s.tests?.map((t: TestModel) => {
                    return {
                        key: `test_${t.id}`,
                        label: t.name,
                        data: { entity: t, entityTypeName: "TestModel" }
                    } as TreeNode;
                })
            } as TreeNode;
        });

        return treeNodes;
    }, []);

    return (
        <div className='main-test-tree-container'>
            <ConfirmDialog />

            <TreeTable
                className="tree-table-container"
                value={buildTreeNodes(datasource)}
                selectionMode="single"
                selectionKeys={selectedKeys}
                onSelectionChange={(e: TreeTableSelectionEvent) => {
                    setSelectedKeys(e.value);
                }}
                onSelect={onSelect}
            >
                <Column expander field="entity.name" header={() => {
                    return (
                        <TreeTableHeaderMenuButton />
                    );
                }} ></Column>
            </ TreeTable>
        </div >
    );
}