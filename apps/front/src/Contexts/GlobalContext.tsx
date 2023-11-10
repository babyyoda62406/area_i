import  { FC, createContext } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";

/**
 * GLobalContext  es donde se usa todo lo k esta global en la aplicacion
 */
export const GlobalContext = createContext<typeGlobalContext>({


})

export const GlobalContextProvider: FC<typeProviderContext> = ({children}) => {
    

    return <GlobalContext.Provider value={{}}>
        {children}
    </GlobalContext.Provider>
}