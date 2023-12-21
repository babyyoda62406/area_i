import  { FC, createContext, useState } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";



/**
 * GLobalContext  es donde se usa todo lo k esta global en la aplicacion
 */
export const GlobalContext = createContext<typeGlobalContext>({
    token: '',
    showSidebar: false,
    
    
    
    
    

    setToken: () => { },
    setShowSidebar: () => { },
   
    
    

})

/**
 * 
 * @param param0 
 * variables globales de la APP
 * @returns 
 */
export const GlobalContextProvider: FC<typeProviderContext> = ({children}) => {
    
    const [token, setToken] = useState<string>('')
    const [showSidebar,setShowSidebar] = useState<boolean>(false)
    
    

    

    return <GlobalContext.Provider value={{token, setToken,showSidebar,setShowSidebar}}>
        {children}
    </GlobalContext.Provider>
}