import axios from "axios";
import { createContext, useCallback, useContext } from "react";
import { SubjectModel } from "../models/subject-model";
import { TestItemModel } from "../models/test-item-model";
import { TestModel } from "../models/test-model";
export type AppDataContextModel = {
    getSubjectAsync: () => Promise<SubjectModel[] | undefined>;
    getTestTreeAsync: () => Promise<SubjectModel[] | undefined>;
    getTestItemsAsync: (testId: number) => Promise<TestItemModel[] | undefined>;
    postTestAsync: (editedTest: TestModel) => Promise<TestModel | undefined>;
    deleteTestAsync: (testId: number) => Promise<TestModel | undefined>;
    putTestAsync: (editedTest: TestModel) => Promise<TestModel | undefined>
}

const webAPIRoot = 'http://127.0.0.1:8000/api';
const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object

function AppDataContextProvider(props: AppDataContextProviderProps) {
    const getSubjectAsync = useCallback(async () => {
        try {
            const response = await axios.request({
                method: 'GET',
                url: `${webAPIRoot}/subjects/`
            });

            if (response && response.status == 200) {
                const subjects = response.data as SubjectModel[];

                return subjects;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getTestTreeAsync = useCallback(async () => {
        try {
            const response = await axios.request({
                method: 'GET',
                url: `${webAPIRoot}/tests-tree/`
            });

            if (response && response.status == 200) {
                const subjects = response.data as SubjectModel[];

                return subjects;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getTestItemsAsync = useCallback(async (testId: number) => {
        try {
            const response = await axios.request({
                url: `${webAPIRoot}/test-items/?testId=${testId}`,
                method: 'GET'
            });

            if (response && response.status == 200) {
                const testItems = response.data as TestItemModel[];

                return testItems;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const postTestAsync = useCallback(async (editedTest: TestModel) => {
        try {
            const response = await axios.request({
                url: `${webAPIRoot}/tests-tree/`,
                method: 'POST',
                data: editedTest,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response && response.status == 200) {
                const editedTest = response.data as TestModel;

                return editedTest;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const deleteTestAsync = useCallback(async (testId: number) => {
        try {
            const response = await axios.request({
                url: `${webAPIRoot}/tests-tree/?testId=${testId}`,
                method: 'DELETE'
            });

            if (response && response.status == 200) {
                const deletedTest = response.data as TestModel;
                console.log(response.data);

                return deletedTest;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const putTestAsync = useCallback(async (editedTest: TestModel) => {
        try {
            const responce = await axios.request({
                url: `${webAPIRoot}/tests-tree/`,
                method: 'PUT',
                data: editedTest,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responce && responce.status == 200) {
                return responce.data as TestModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);


    return <AppDataContext.Provider value={{
        getSubjectAsync, getTestTreeAsync, getTestItemsAsync, postTestAsync, deleteTestAsync, putTestAsync
    }} {...props} />;
}

const useAppDataContext = () => useContext(AppDataContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AppDataContextProvider, useAppDataContext };