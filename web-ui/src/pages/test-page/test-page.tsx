import './test-page.scss'

import { useEffect, useState } from "react";

import { SubjectModel } from "../../models/subject-model";
import { TestItemModel } from "../../models/test-item-model";

import { useAppDataContext } from "../../contexts/app-data-context";
import { TestTree } from "../../components/test-tree/test-tree";
import { TestItemDataTable } from "../../components/test-item-data-table/test-item-data-table";
import { MainToolBar } from "../../components/main-tool-bar/main-tool-bar";
import { TestEditDialog } from '../../components/test-tree/test-dialog-window';
import { EntityTreeNodeDataModel } from '../../models/entity-tree-node-data-model';
import { TestModel } from '../../models/test-model';
import { TestPageContextProvider, useTestPageContext } from './test-page-context';

const InnerTestPage = () => {
    const [subjects, setSubjects] = useState<SubjectModel[]>();
    const [testItems, setTestItems] = useState<TestItemModel[]>();
    const { getTestTreeAsync, getTestItemsAsync } = useAppDataContext();
    const { testDialogMode, testDialogToggle, setTestDialogToggle, selectedNode, setSelectedNode } = useTestPageContext();

    useEffect(() => {
        (async () => {
            const subjects = await getTestTreeAsync();
            if (subjects) {
                setSubjects(subjects);
            }
        })();
    }, [getTestTreeAsync]);


    return (
        <div className="main-test-page-component">
            <MainToolBar />



            {testDialogToggle ?
                <TestEditDialog
                    mode={testDialogMode}
                    editedTest={selectedNode ? (selectedNode?.data as EntityTreeNodeDataModel).entity as TestModel : undefined}
                    onHide={async (updatedTest?: TestModel) => {
                        if (!testDialogToggle) {
                            return;
                        }
                        setTestDialogToggle(false);

                        if (updatedTest) {
                            //
                        }
                        console.log(updatedTest);

                    }} />
                : null
            }

            <div className="test-page-content">
                <div style={{ display: 'flex' }}>
                    <TestTree datasource={subjects} onSelect={async (e) => {
                        if (e.node.data) {
                            const testItems = await getTestItemsAsync(e.node.data.entity.id);
                            setTestItems(testItems);
                        }
                        if ((e.node.data as EntityTreeNodeDataModel).entityTypeName === 'TestModel') {
                            setSelectedNode(e.node);
                        }
                    }} />
                </div>

                <TestItemDataTable datasource={testItems} />
            </div>
        </div>
    )
}

export const TestPage = () => {
    return (
        <TestPageContextProvider>
            <InnerTestPage />
        </TestPageContextProvider>
    );
}