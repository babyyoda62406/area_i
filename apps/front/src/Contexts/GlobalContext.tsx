import  { FC, createContext, useState } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";
import { typeShowModal } from "../Types/UseStates";


/**
 * GLobalContext  es donde se usa todo lo k esta global en la aplicacion
 */
export const GlobalContext = createContext<typeGlobalContext>({
    token: '',
    showSidebar: false,
    showModal: {
        proyectos:false
    },
    

    setToken: () => { },
    setShowSidebar: () => { },
    setShowModal: ()=>{}

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
    const [showModal, setShowModal] = useState<typeShowModal>({
        proyectos:false
    })

    return <GlobalContext.Provider value={{token, setToken,showSidebar,setShowSidebar,showModal,setShowModal}}>
        {children}
    </GlobalContext.Provider>
}