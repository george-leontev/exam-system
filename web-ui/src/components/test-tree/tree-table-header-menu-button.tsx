import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Menu } from "primereact/menu";
import { useCallback, useMemo, useRef } from "react";
import { IoMdMore as MoreIcon } from "react-icons/io";
import { useTestPageContext } from "../../pages/test-page/test-page-context";
import { EntityTreeNodeDataModel } from "../../models/entity-tree-node-data-model";
import { useAppDataContext } from "../../contexts/app-data-context";
import { useAppSharedContext } from "../../contexts/app-shared-context";
import { TestDialogModes } from "../../models/enums/test-dialog-modes";
import { MenuItem } from "primereact/menuitem";

export const TreeTableHeaderMenuButton = () => {
    const { deleteTestAsync } = useAppDataContext();
    const { selectedNode, setTestDialogToggle, setTestDialogMode } = useTestPageContext();
    const { toast } = useAppSharedContext();
    const menuTreeRef = useRef<Menu>(null);

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
                    life: 3000
                });
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
        <div className='treetable-header-button-container'>
            <Menu
                model={menuItems}
                popup
                ref={menuTreeRef}
                id="popup_menu_left"
                popupAlignment="right"
            />

            <Button
                className='treetable-header-button'
                onClick={(event) => menuTreeRef.current!.toggle(event)}
                aria-haspopup
                icon={<MoreIcon className='more-icon' aria-controls="popup_menu_left" />}
            />
        </div>
    );
}