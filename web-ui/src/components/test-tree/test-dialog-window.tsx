import './test-dialog-window.scss'

import { useAppDataContext } from '../../contexts/app-data-context';

import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ChangeEvent, useEffect, useState } from 'react';

import { SubjectModel } from '../../models/subject-model';
import { TestModel } from '../../models/test-model';
import { TestDialogModes } from '../../models/enums/test-dialog-modes';
import { TestDialogProps } from '../../models/test-dialog-props';


export const TestEditDialog = ({ mode, onHide, editedTest }: TestDialogProps) => {
    const [subjects, setSubjects] = useState<SubjectModel[] | undefined>();
    const { getSubjectAsync, postTestAsync, putTestAsync } = useAppDataContext();
    const [test, setTest] = useState<TestModel>(mode === TestDialogModes.edit && editedTest ? { ...editedTest } : {
        id: 0,
        name: '',
        subjectId: 0,
    } as TestModel);

    useEffect(() => {
        (async () => {
            const subjects = await getSubjectAsync();

            if (subjects) {
                setSubjects(subjects);
            }
        })();
    }, [getSubjectAsync]);


    return (
        <Dialog
            className='dialog-window'
            header={mode === TestDialogModes.add ? 'Add test' : 'Edit test'}
            visible={true}
            onHide={onHide}>
            <div className='dialog-window-content'>
                <input type="hidden" value={test.id} />
                <InputText
                    id='test-name'
                    value={test.name}
                    placeholder='Test name'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setTest({ ...test, name: e.target.value });
                    }}
                />
                <Dropdown
                    value={test.subjectId}
                    optionValue='id'
                    options={subjects}
                    optionLabel="name"
                    placeholder="Select a Subject"
                    onChange={(e: DropdownChangeEvent) => {
                        setTest({ ...test, subjectId: e.value });
                        console.log('onChange', e);
                    }}
                />
                <div className='dialog-window-button-container'>
                    <Button
                        className='save-test-button p-button'
                        icon={'pi pi-check'}
                        onClick={async () => {
                            let updatedTest: TestModel | undefined;
                            if (test) {
                                if (mode === TestDialogModes.add) {
                                    updatedTest = await postTestAsync(test);
                                } else if (mode === TestDialogModes.edit) {
                                    updatedTest = await putTestAsync(test);
                                }
                            }
                            onHide(updatedTest);
                        }}>
                        Save
                    </Button>
                </div>
            </div>
        </Dialog >
    );
}