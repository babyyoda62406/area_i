import  { FC, createContext, useState } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";

/**
 * GLobalContext  es donde se usa todo lo k esta global en la aplicacion
 */
export const GlobalContext = createContext<typeGlobalContext>({
    token: '',
    

    setToken: (arg)=>{}

})

export const GlobalContextProvider: FC<typeProviderContext> = ({children}) => {
    
    const [token, setToken] = useState<string>('')

    return <GlobalContext.Provider value={{token, setToken}}>
        {children}
    </GlobalContext.Provider>
}