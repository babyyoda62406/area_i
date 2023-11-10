import  { FC, createContext } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";


export const GlobalContext = createContext<typeGlobalContext>({


})

export const GlobalContextProvider: FC<typeProviderContext> = () => {
    

    return <GlobalContext.Provider value={{}}>
        children
    </GlobalContext.Provider>
}