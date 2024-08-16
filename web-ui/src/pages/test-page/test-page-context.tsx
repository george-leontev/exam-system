import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { TestDialogModes } from "../../models/enums/test-dialog-modes";
import { TreeNode } from "primereact/treenode";

export type TestPageContextModel = {
    testDialogMode: TestDialogModes | undefined;
    setTestDialogMode: Dispatch<SetStateAction<TestDialogModes | undefined>>;

    selectedNode: TreeNode | undefined;
    setSelectedNode: Dispatch<SetStateAction<TreeNode | undefined>>

    testDialogToggle: boolean;
    setTestDialogToggle: Dispatch<SetStateAction<boolean>>;
}

const TestPageContext = createContext({} as TestPageContextModel);

function TestPageContextProvider(props: object) {
    const [testDialogMode, setTestDialogMode] = useState<TestDialogModes | undefined>();
    const [selectedNode, setSelectedNode] = useState<TreeNode>();
    const [testDialogToggle, setTestDialogToggle] = useState(false);

    return <TestPageContext.Provider value={{ testDialogMode, setTestDialogMode, selectedNode, setSelectedNode, testDialogToggle, setTestDialogToggle }} {...props} />;
}
const useTestPageContext = () => useContext(TestPageContext);

// eslint-disable-next-line react-refresh/only-export-components
export { TestPageContextProvider, useTestPageContext }