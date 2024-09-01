import axios from "axios";
import { createContext, useCallback, useContext } from "react";
import { SubjectModel } from "../models/subject-model";
import { TestItemModel } from "../models/test-item-model";
import { TestModel } from "../models/test-model";
import { TestItemTypeModel } from "../models/test-item-type-model";
import { TestItemOptionModel } from "../models/test-item-option-model";
export type AppDataContextModel = {
    getSubjectAsync: () => Promise<SubjectModel[] | undefined>;
    getTestTreeAsync: () => Promise<SubjectModel[] | undefined>;
    postTestAsync: (editedTest: TestModel) => Promise<TestModel | undefined>;
    deleteTestAsync: (testId: number) => Promise<TestModel | undefined>;
    putTestAsync: (editedTest: TestModel) => Promise<TestModel | undefined>
    getTestItemsAsync: (testId: number) => Promise<TestItemModel[] | undefined>;
    postTestItemAsync: (editedTestItem: TestItemModel) => Promise<TestItemModel | undefined>;
    putTestItemAsync: (editedTestItem: TestItemModel) => Promise<TestItemModel | undefined>
    deleteTestItemAsync: (testItemId: number) => Promise<TestItemModel | undefined>
    getTestItemTypesAsync: () => Promise<TestItemTypeModel[] | undefined>;
    getTestItemOptionsAsync: (testItemId: number) => Promise<TestItemOptionModel[] | undefined>;
    postTestItemOptionAsync: (editedTestItemOption: TestItemOptionModel) => Promise<TestItemOptionModel | undefined>;
    putTestItemOptionsAsync: (editedTestItemOption: TestItemOptionModel) => Promise<TestItemOptionModel | undefined>;
    deleteTestItemOptionsAsync: (testItemOptionId: number) => Promise<TestItemOptionModel | undefined>;
}

const webAPIRoot = 'http://127.0.0.1:8000/api';
const AppDataContext = createContext({} as AppDataContextModel);

export type AppDataContextProviderProps = object

function AppDataContextProvider(props: AppDataContextProviderProps) {
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

    const postTestItemAsync = useCallback(async (editedTestItem: TestItemModel) => {
        try {
            const response = await axios.request({
                url: `${webAPIRoot}/test-items/?withOptions`,
                method: 'POST',
                data: editedTestItem,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response && response.status == 200) {
                const editedTestItem = response.data as TestItemModel;

                return editedTestItem;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const putTestItemAsync = useCallback(async (editedTestItem: TestItemModel) => {
        try {
            const responce = await axios.request({
                url: `${webAPIRoot}/test-items/`,
                method: 'PUT',
                data: editedTestItem,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responce && responce.status == 200) {
                return responce.data as TestItemModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const deleteTestItemAsync = useCallback(async (testItemId: number) => {
        try {
            const responce = await axios.request({
                url: `${webAPIRoot}/test-items/?testItemId=${testItemId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responce && responce.status == 200) {
                return responce.data as TestItemModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const getTestItemTypesAsync = useCallback(async () => {
        try {
            const responce = await axios.request({
                url: `${webAPIRoot}/test-item-types/`,
                method: 'GET'
            });

            if (responce && responce.status == 200) {
                const testItemTypes = responce.data;

                return testItemTypes as TestItemTypeModel[];
            }

        } catch (error) {
            console.log(error);
        }
    }, []);

    const getTestItemOptionsAsync = useCallback(async (testItemId: number) => {
        try {
            const responce = await axios.request({
                url: `${webAPIRoot}/test-item-options/?testItemId=${testItemId}`,
                method: 'GET'
            });

            if (responce && responce.status == 200) {
                return responce.data as TestItemOptionModel[];
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const postTestItemOptionAsync = useCallback(async (editedTestItemOption: TestItemOptionModel) => {
        try {
            const response = await axios.request({
                url: `${webAPIRoot}/test-item-options/`,
                method: 'POST',
                data: editedTestItemOption,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response && response.status == 200) {
                return response.data as TestItemOptionModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const putTestItemOptionsAsync = useCallback(async (editedTestItemOption: TestItemOptionModel) => {
        try {
            const responce = await axios.request({
                url: `${webAPIRoot}/test-item-options/`,
                method: 'PUT',
                data: editedTestItemOption,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responce && responce.status == 200) {
                return responce.data as TestItemOptionModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const deleteTestItemOptionsAsync = useCallback(async (testItemOptionId: number) => {
        try {
            const responce = await axios.request({
                url: `${webAPIRoot}/test-item-options/?testItemOptionId=${testItemOptionId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responce && responce.status == 200) {
                return responce.data as TestItemOptionModel;
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    return <AppDataContext.Provider value={{
        getSubjectAsync,
        getTestTreeAsync,
        postTestAsync,
        deleteTestAsync,
        putTestAsync,
        getTestItemsAsync,
        postTestItemAsync,
        putTestItemAsync,
        deleteTestItemAsync,
        getTestItemTypesAsync,
        getTestItemOptionsAsync,
        postTestItemOptionAsync,
        putTestItemOptionsAsync,
        deleteTestItemOptionsAsync
    }} {...props} />;
}

const useAppDataContext = () => useContext(AppDataContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AppDataContextProvider, useAppDataContext };