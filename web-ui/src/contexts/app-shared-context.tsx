import { Toast } from "primereact/toast";
import { createContext, RefObject, useContext, useRef } from "react"

export type AppSharedContextModel = {
    toast: RefObject<Toast>;
}

const AppSharedContext = createContext({} as AppSharedContextModel);

function AppSharedContextProvider(props: object) {
    const toast = useRef<Toast>(null);

    return <AppSharedContext.Provider value={{ toast }} {...props}></AppSharedContext.Provider>
}

const useAppSharedContext = () => useContext(AppSharedContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AppSharedContextProvider, useAppSharedContext }