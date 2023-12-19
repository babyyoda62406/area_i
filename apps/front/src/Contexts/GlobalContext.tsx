import  { FC, createContext, useState } from "react";
import { typeGlobalContext, typeProviderContext } from "../Types/GlobalContext";
import { typeActualizarTabla, typeShowModal } from "../Types/UseStates";


/**
 * GLobalContext  es donde se usa todo lo k esta global en la aplicacion
 */
export const GlobalContext = createContext<typeGlobalContext>({
    token: '',
    showSidebar: false,
    showModal: {
        proyectos:false
    },
    actualizarTabla: { tablaProyectos: 0 },
    
    
    

    setToken: () => { },
    setShowSidebar: () => { },
    setShowModal: () => { },
    setActualizarTabla: () => { },
    

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
        proyectos:false,
    })
    const [actualizarTabla, setActualizarTabla] = useState<typeActualizarTabla>({
        tablaProyectos: 0
    })

    

    return <GlobalContext.Provider value={{token, setToken,showSidebar,setShowSidebar,showModal,setShowModal,actualizarTabla,setActualizarTabla}}>
        {children}
    </GlobalContext.Provider>
}