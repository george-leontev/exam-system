import { useCallback, useState } from 'react';

import { TreeTable, TreeTableSelectionEvent, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { Button } from 'primereact/button';

import { TestTreeProps } from '../../models/test-tree-props';
import { SubjectModel } from '../../models/subject-model';
import { TestModel } from '../../models/test-model';

import { IoMdMore as MoreIcon } from "react-icons/io";
import './test-tree.scss';


export const TestTree = ({ datasource, onSelect, menuTreeRef }: TestTreeProps) => {
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
            <TreeTable
                className="tree-table-container"
                value={buildTreeNodes(datasource)}
                selectionMode="single"
                sortField='entity.id'
                sortMode='single'
                sortOrder={-1}
                selectionKeys={selectedKeys}
                onSelectionChange={(e: TreeTableSelectionEvent) => {
                    setSelectedKeys(e.value);
                }}
                onSelect={onSelect}
            >
                <Column expander field="entity.name" header={() => {
                    return (
                        <div className='treetable-header-button-container'>
                            <Button
                                className='default-button-icon'
                                icon={<MoreIcon style={{height: '26px', width: '26px'}} aria-controls="popup_menu_left" />}
                                aria-haspopup
                                onClick={(event) => menuTreeRef.current!.toggle(event)}
                            />
                        </div>
                    );
                }} ></Column>
            </ TreeTable>
        </div >
    );
}