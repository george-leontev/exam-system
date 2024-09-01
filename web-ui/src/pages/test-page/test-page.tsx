import './test-page.scss'

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
import { confirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { TestDialogModes } from '../../models/enums/test-dialog-modes';
import { useAppSharedContext } from '../../contexts/app-shared-context';
import { v4 as uuidv4 } from 'uuid';

const InnerTestPage = () => {
    const [subjects, setSubjects] = useState<SubjectModel[]>();
    const [testItems, setTestItems] = useState<TestItemModel[]>();
    const [activeTest, setActiveTest] = useState<TestModel>();
    const { getTestTreeAsync, getTestItemsAsync } = useAppDataContext();
    const { testDialogMode, setTestDialogMode, testDialogToggle, setTestDialogToggle, selectedNode, setSelectedNode } = useTestPageContext();
    const { deleteTestAsync } = useAppDataContext();
    const menuTreeRef = useRef<Menu>(null);
    const { toast } = useAppSharedContext();
    const [refreshToken, setRefreshToken] = useState<string>(uuidv4());

    useEffect(() => {
        (async () => {
            const subjects = await getTestTreeAsync();
            if (subjects) {
                setSubjects(subjects);
            }
        })();
    }, [getTestTreeAsync, refreshToken]);

    const confirm = useCallback(() => {
        confirmDialog({
            message: `Do you want to delete "${(selectedNode?.data as EntityTreeNodeDataModel).entity.name}"?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                await deleteTestAsync((selectedNode?.data as EntityTreeNodeDataModel).entity.id);
                toast.current?.show({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: `You have deleted the "${(selectedNode?.data as EntityTreeNodeDataModel).entity.name}".`,
                    life: 3500
                });
                setRefreshToken(uuidv4());
            },
            reject: () => {
                return;
            }
        });
    }, [deleteTestAsync, selectedNode?.data, toast])

    const menuItems = useMemo(() => {
        return [
            {
                label: 'Add...',
                icon: 'pi pi-plus',
                command: () => {
                    setTestDialogToggle(true);
                    setTestDialogMode(TestDialogModes.add);
                },
            },
            {
                label: "Edit...",
                icon: 'pi pi-pencil',
                command: async () => {
                    if ((selectedNode?.data as EntityTreeNodeDataModel).entityTypeName === "TestModel") {
                        setTestDialogToggle(true);
                        setTestDialogMode(TestDialogModes.edit);
                    }
                },
                disabled: !selectedNode || (selectedNode.data as EntityTreeNodeDataModel).entityTypeName !== "TestModel",
            },
            {
                label: "Delete...",
                icon: 'pi pi-times',
                command: async () => {
                    if ((selectedNode?.data as EntityTreeNodeDataModel).entityTypeName === "TestModel") {
                        confirm();
                    }

                },
                disabled: !selectedNode || (selectedNode.data as EntityTreeNodeDataModel).entityTypeName !== "TestModel",
            },
        ] as MenuItem[];
    }, [confirm, selectedNode, setTestDialogMode, setTestDialogToggle]);

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
                            setRefreshToken(uuidv4());
                        }
                        console.log(updatedTest);

                    }} />
                : null
            }

            <div className="test-page-content">
                <div style={{ display: 'flex' }}>
                    <Menu
                        ref={menuTreeRef}
                        model={menuItems}
                        popup
                        popupAlignment="right"
                    />

                    <TestTree datasource={subjects} menuTreeRef={menuTreeRef} onSelect={async (e) => {
                        if (e.node.data && e.node.data.entityTypeName === 'TestModel') {
                            setActiveTest(e.node.data.entity);


                            const testItems = await getTestItemsAsync(e.node.data.entity.id);
                            setTestItems(testItems);
                            setSelectedNode(e.node);
                        }
                        else {
                            setTestItems([]);
                        }
                    }} />
                </div>

                <TestItemDataTable datasource={testItems} activeTest={activeTest} />
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